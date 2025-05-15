// controllers/dmpDocumentsController.js

import { computed, ref } from 'vue';
import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore';
import { DmpServices } from '../models/services/dmp.services';

export function useDmpDocumentsController() {
  // Get the store instance
  const store = useDmpDocumentsStore();
  const dmpServices = new DmpServices();

  // GETTERS from the store
  const documents = computed(() => store.documents);
  const patient = computed(() => store.patient);
  const isLoading = ref(false);
  const error = ref(null);

  // LOCAL STATES
  const selectedViewIndex = ref(0);
  const sortingType = ref(0);
  const previewMode = ref(false);
  const previewLoading = ref(false);
  const previewedFileIndex = ref(null);
  const file = ref('');
  const fileType = ref('');
  const fileName = ref('');
  const downloadIndex = ref(null);

  // ACTIONS
  async function fetchDocuments(query = 'FindDocuments') {
    isLoading.value = true;
    error.value = null;
    
    try {
      if (!store.patient) {
        console.error('No patient selected');
        error.value = 'Aucun patient sélectionné';
        return;
      }
      
      // Get the patient's INS
      const patientINS = getPatientINS(store.patient);
      
      console.log('Fetching documents for patient:', store.patient);
      console.log('Using INS:', patientINS);
      
      const fetchedDocuments = await dmpServices.td31Find(query, patientINS);
      store.documents = fetchedDocuments || [];
      console.log('Documents fetched:', store.documents);
    } catch (err) {
      console.error('Error fetching documents:', err);
      error.value = err.message || 'Erreur lors de la récupération des documents';
    } finally {
      isLoading.value = false;
    }
  }
  
  function getPatientINS(patient) {
    if (!patient) return null;
    
    // Check if the patient has matriculeINS (from dmpDocumentsStore) or ins (from patientStore)
    if (patient.matriculeINS && patient.matriculeINS.valeur) {
      return patient.matriculeINS.valeur;
    } else if (patient.ins) {
      return patient.ins;
    }
    
    // Default to a test value if no INS is found
    return "279035121518989";
  }

  async function previewFile(index) {
    previewedFileIndex.value = index;
    previewMode.value = true;
    previewLoading.value = true;
    
    try {
      if (!store.patient) {
        console.error('No patient selected');
        error.value = 'Aucun patient sélectionné';
        return;
      }
      
      // Get the patient's INS
      const patientINS = getPatientINS(store.patient);
      
      // Get the document
      const document = documents.value[index];
      
      console.log('Retrieving content for document:', document.title);
      console.log('Using INS:', patientINS);
      
      const content = await dmpServices.td32RetrieveContent(document, patientINS);
      file.value = content;
      // Determine file type based on content or metadata
      fileType.value = determineFileType(content);
      fileName.value = document?.title || 'Document';
    } catch (err) {
      console.error('Error previewing file:', err);
      error.value = err.message || 'Erreur lors de la prévisualisation du document';
    } finally {
      previewLoading.value = false;
    }
  }

  function determineFileType(content) {
    // Simple logic to determine file type based on content
    // In a real app, this would be more sophisticated
    if (typeof content === 'string' && content.startsWith('%PDF')) {
      return 'application/pdf';
    } else if (typeof content === 'string' && content.startsWith('<')) {
      return 'text/html';
    }
    return 'text/plain';
  }

  // UTILITY METHODS
  function getSortButtonStyle(type1, type2) {
    if (sortingType.value === type1 || sortingType.value === type2) {
      return 'background-color: #8ca9b8; color: #fff';
    }
    return 'background-color: #f6f6f6';
  }

  function getToggleButtonStyle(index) {
    return selectedViewIndex.value === index
      ? 'background-color: #8ca9b8; color: #fff'
      : 'background-color: #f6f6f6';
  }

  function getViewIcon() {
    return selectedViewIndex.value ? 'mdi-view-grid' : 'mdi-view-grid-outline';
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr').format(date);
  }

  function getDocumentsNumberTxt() {
    const count = documents.value.length;
    return `${count} document${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
  }

  function getAuthorsNames(authors) {
    if (!authors || !Array.isArray(authors)) return '-';
    return authors.map(a => `${a.nom} ${a.prenom}`).join(', ');
  }

  // Return all properties that the component will use
  return {
    documents,
    patient,
    isLoading,
    error,

    selectedViewIndex,
    sortingType,
    previewMode,
    previewLoading,
    previewedFileIndex,
    file,
    fileType,
    fileName,
    downloadIndex,

    // Actions
    fetchDocuments,
    previewFile,

    // Utility methods
    getSortButtonStyle,
    getToggleButtonStyle,
    getViewIcon,
    formatDate,
    getDocumentsNumberTxt,
    getAuthorsNames
  };
}
