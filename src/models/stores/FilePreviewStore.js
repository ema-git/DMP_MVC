import { defineStore } from 'pinia';
import { FileServices } from '../services/file.services.js';

const fileServices = new FileServices();

export const useFilePreviewStore = defineStore('filePreviewStore', {
  state: () => ({
    documentContentUtf8: '',
    fileExtension: '',
  }),
  
  actions: {
    initializeFile(documentContent, documentType) {
      this.fileExtension = fileServices.getFileExtension(documentType);

      if (documentType === 'application/pdf') {
        this.displayPdfFromB64Data(documentContent, 'pdfContainer');
      } else {
        this.documentContentUtf8 = fileServices.byteArrayToUtf8(documentContent);
      }
    },

    downloadFile(documentContent, documentType, fileName) {
      const fileType = documentType;
      const file = documentContent;

      const blob = new Blob([file], { type: fileType });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName + this.fileExtension;
      link.click();
    },

    displayPdfFromB64Data(b64Data, elementId) {
      const blob = new Blob([b64Data], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = objectUrl;

      const container = document.getElementById(elementId);
      container.innerHTML = '';
      container.appendChild(iframe);
    }
  }
});