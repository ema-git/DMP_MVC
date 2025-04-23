import { defineStore } from 'pinia';
import { DmpServices } from "../services/dmp.services.js";
import { FileServices } from "../services/file.services.js";

const dmpServices = new DmpServices();
const fileServices = new FileServices();

export const useDocumentsStore = defineStore({
  id: 'documentsStore',
  state: () => ({
    documents: [],
    isLoading: false,
    error: null,
    isDmpInactive: false,
    dmpInactiveReason: null,
    selectedSort: 0, // 0: Name ASC, 1: Name DESC, 2: Date ASC, 3: Date DESC
    filterVisible: false
  }),
  
  getters: {
    // Getters are automatically computed properties in Pinia
  },
  
  actions: {
    async checkDMPExistanceAndFetchDocuments() {
      try {
        const dmpStatus = await dmpServices.checkDMPExistance();
        if (dmpStatus) {
          await this.fetchDocuments();
        } else {
          this.isDmpInactive = true;
          this.dmpInactiveReason = "DMP inactif";
        }
      } catch (error) {
        this.error = error.message || "Erreur de récupération des documents";
      }
    },

    async fetchDocuments() {
      this.isLoading = true;
      try {
        const documents = await dmpServices.fetchDocuments(this.selectedSort);
        this.documents = documents;
      } catch (error) {
        this.error = error.message || "Erreur de récupération des documents";
      } finally {
        this.isLoading = false;
      }
    },

    async previewFile(index) {
      try {
        const file = await fileServices.getFileContent(index);
        // Handle file preview logic
        return file;
      } catch (error) {
        this.error = error.message || "Erreur de prévisualisation";
      }
    },

    async downloadFile(index) {
      try {
        await fileServices.downloadFile(index);
      } catch (error) {
        this.error = error.message || "Erreur de téléchargement";
      }
    },
    
    // Mutations become actions in Pinia
    toggleFilterVisibility() {
      this.filterVisible = !this.filterVisible;
    },
    
    toggleSortByName() {
      this.selectedSort = this.selectedSort === 0 ? 1 : 0;
    },
    
    toggleSortByDate() {
      this.selectedSort = this.selectedSort === 2 ? 3 : 2;
    }
  }
});
