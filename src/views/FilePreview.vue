<template>
  <div>
    <v-card class="fileCard" rounded="xl">
      <div class="fileCardHeader">
        <v-row align="center">
          <v-col>
            <div class="title">{{ fileName }}</div>
          </v-col>
          <v-col class="text-right">
            <v-btn
              class="closeBtn"
              icon
              rounded="lg"
              elevation="0"
              @click="downloadFile"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn
              class="closeBtn"
              icon
              rounded="lg"
              elevation="0"
              @click="$emit('close')"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-if="documentType == 'application/pdf'" style="height: 100%;">
        <div id="pdfContainer" style="height: 100%;"></div>
      </div>
      <div v-if="documentType == 'text/plain'">
        <pre class="m-3">{{ documentContentUtf8 }}</pre>
      </div>
      <div v-else style="height: 100%;">
        <div class="m-3 centered">Aperçu non-disponible pour ce format de fichier ({{ fileExtension }})</div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { useFilePreviewStore } from '../models/stores/FilePreviewStore';
import '../theme/FilePreview.css'

export default {
  props: {
    documentContent: {
      required: true,
    },
    documentType: {
      required: true,
    },
    fileName: {
      required: true,
    },
  },
  computed: {
    documentContentUtf8() {
      return this.filePreviewStore.documentContentUtf8;
    },
    fileExtension() {
      return this.filePreviewStore.fileExtension;
    },
  },
  methods: {
    downloadFile() {
      this.filePreviewStore.downloadFile(this.documentContent, this.documentType, this.fileName);
    },
    displayPdfFromB64Data() {
      this.filePreviewStore.displayPdfFromB64Data(this.documentContent, 'pdfContainer');
    }
  },
  mounted() {
    this.filePreviewStore = useFilePreviewStore();
    this.filePreviewStore.initializeFile(this.documentContent, this.documentType);
  },
};
</script>
