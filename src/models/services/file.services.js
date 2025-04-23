import { useDmpDocumentsStore } from '../stores/dmpDocumentsStore';
import { DmpServices } from './dmp.services';

const dmpServices = new DmpServices();

export class FileServices {
    constructor() {
    }

    async download(fileIndex) {
      try {
        // fetching file from TD32>
        const td32RetrieveContentResponse = await dmpServices.td32RetrieveContent(fileIndex);

        // get file type
        const fileType = this.getFileType(await this.b64ToUtf8(td32RetrieveContentResponse.cdaContent))
        //const fileType = "application/pdf"

        // convert file from base64 to utf8
        const file = this.b64ToUtf8(td32RetrieveContentResponse.binaryContent, fileType);
        console.log(file)

        // download file with correct extension
        const blob = new Blob([file], { type: fileType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.getFileName(fileIndex) + this.getFileExtension(fileType);
        link.click();
      }
      catch (exception) {
        console.log(exception);
        // TODO: gérer l'exception
      }
    }

    getFileName(fileIndex) {
      return useDmpDocumentsStore().documents[fileIndex].title;
    }

    b64ToUtf8(b64Data) {
      const byteCharacters = atob(b64Data);
      const byteNumbers = new Array(byteCharacters.length);
    
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
    
      const byteArray = new Uint8Array(byteNumbers);
      return byteArray;
    }

    b64ToBlob(b64Data, contentType = "text/plain") {
      console.log(contentType)
      const byteCharacters = atob(b64Data);
      const byteNumbers = new Array(byteCharacters.length);
    
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
    
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    }

    byteArrayToUtf8(byteArray) {
      return new TextDecoder("utf-8").decode(byteArray);
    }

    getFileType(cdaContent) {
      const utf8CdaContent = this.byteArrayToUtf8(cdaContent);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(utf8CdaContent, "text/xml");
      const rootElement = xmlDoc.documentElement;
      const text = rootElement.querySelector("text");
      console.log("text =" + text);
      if (text == null) {
        return "text/plain";
      }

      const mediaType = text.getAttribute("mediaType");

      console.log(mediaType);
      return mediaType;
    }

    getFileExtension(fileType) {
      switch (fileType) {
        case "text/plain":
          return ".txt";
        case "application/pdf":
          return ".pdf";
        case "text/html":
          return ".html";
        case "text/xml":
          return ".xml";
        case "application/xml":
          return ".xml";
        case "application/json":
          return ".json";
        case "application/rtf":
          return ".rtf";
        case "text/rtf":
          return ".rtf";
        case "image/png":
          return ".png";
        case "image/jpeg":
          return ".jpeg";
        case "image/gif":
          return ".gif";
        case "image/bmp":
          return ".bmp";
        case "image/tiff":
          return ".tiff";
        case "image/svg+xml":
          return ".svg";
        case "application/msword":
          return ".doc";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return ".docx";
        case "application/vnd.ms-excel":
          return ".xls";
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return ".xlsx";
        case "application/vnd.ms-powerpoint":
          return ".ppt";
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          return ".pptx";
        case "application/zip":
          return ".zip";
        // return a plain text file by default
        default:
          return ".txt";
      }
    }
  }