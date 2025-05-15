<template>
  <!-- Error handling -->
  <div v-if="error" class="error-message">
    {{ error }}
    <v-btn @click="fetchDocuments" color="primary" class="mt-2">Réessayer</v-btn>
  </div>

  <v-card class="documents-card">
    <v-card-title class="d-flex align-center">
      <span class="text-h5">Documents du patient</span>
      <v-spacer></v-spacer>
      <v-btn-toggle
        v-model="selectedViewIndex"
        mandatory
        variant="outlined"
        rounded="lg"
        density="comfortable"
        class="mr-2"
      >
        <v-btn height="35px" icon="mdi-view-headline" :style="getToggleButtonStyle(0)" />
        <v-btn height="35px" :icon="getViewIcon()" :style="getToggleButtonStyle(1)" />
      </v-btn-toggle>
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text>
      <v-row class="align-center mb-4">
    <v-btn
      @click="toggleSortByName"
      class="mr-5"
      rounded="lg"
      variant="outlined"
      :style="getSortButtonStyle(0, 1)"
    >
      <v-icon v-if="sortingType === 0">mdi-arrow-down</v-icon>
      <v-icon v-else-if="sortingType === 1">mdi-arrow-up</v-icon>
      <span style="margin-left: 10px;">Nom</span>
    </v-btn>

    <v-btn
      @click="toggleSortByDate"
      class="mr-5"
      rounded="lg"
      variant="outlined"
      :style="getSortButtonStyle(2, 3)"
    >
      <v-icon v-if="sortingType === 2">mdi-arrow-down</v-icon>
      <v-icon v-else-if="sortingType === 3">mdi-arrow-up</v-icon>
      <span style="margin-left: 10px;">Date</span>
    </v-btn>
    
    <v-btn
      v-show="!isLoading"
      @click="fetchDocuments"
      rounded="lg"
      variant="outlined"
      style="border-color: #54545454; background-color: #f6f6f6; min-width: 35px;"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    
    <v-col v-if="!isLoading" class="float-right" v-show="documents.length >= 0">
      {{ getDocumentsNumberTxt() }}
    </v-col>
    <v-col v-else>Récupération des documents...</v-col>
    
    <v-spacer />
  </v-row>

      <v-row v-if="!isLoading" class="mt-4">
    <v-col>
      <!-- Grid view -->
      <v-container fluid v-show="selectedViewIndex === 1" class="docContainer">
        <v-row>
          <v-col
            v-for="(document, index) in documents"
            :key="document.internalId ?? index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-card @dblclick="previewFile(index)" class="documentCard">
              <v-card-text>
                <div class="d-flex align-center justify-center mt-2 mb-2">
                  <v-avatar size="large">
                    <v-icon>mdi-file-document-multiple-outline</v-icon>
                  </v-avatar>
                </div>
                <v-card-title class="text-center">{{ document.title }}</v-card-title>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- List view (table) -->
      <v-table v-show="selectedViewIndex === 0" class="document-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(document, index) in documents"
            :key="document.internalId ?? index"
            @click="showDocumentDetails(document, index)"
            class="document-row"
          >
            <td>{{ formatDate(document.creationDateTime) }}</td>
            <td>{{ document.typeCode?.libelle || document.type }}</td>
            <td>{{ document.title }}</td>
            <td>{{ getAuthorName(document) }}</td>
            <td class="actions-cell">
              <v-tooltip text="Visualiser">
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click.stop="showDocumentDetails(document, index)"
                    icon
                    size="small"
                    color="info"
                    v-bind="props"
                    class="mx-1"
                  >
                    <v-icon>mdi-information-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              
              <v-tooltip text="Archiver">
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click.stop="archiveDocument(document, index)"
                    icon
                    size="small"
                    color="warning"
                    v-bind="props"
                    class="mx-1"
                  >
                    <v-icon>mdi-archive-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              
              <v-tooltip text="Modifier la visibilité">
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click.stop="changeVisibility(document, index)"
                    icon
                    size="small"
                    color="secondary"
                    v-bind="props"
                    class="mx-1"
                  >
                    <v-icon>mdi-eye-settings-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              
              <v-tooltip text="Télécharger">
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click.stop="downloadDocument(document, index)"
                    icon
                    size="small"
                    color="primary"
                    v-bind="props"
                    class="mx-1"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>

  <!-- File preview dialog -->
  <v-dialog v-if="previewedFileIndex != null" v-model="previewMode" max-width="800px">
    <v-card v-if="!previewLoading" height="600px" width="800px">
      <v-card-title>{{ fileName }}</v-card-title>
      <v-card-text>
        <div v-if="fileType === 'application/pdf'" class="pdf-container">
          <!-- PDF viewer would go here -->
          <iframe :src="'data:application/pdf;base64,' + file" width="100%" height="500px"></iframe>
        </div>
        <div v-else-if="fileType === 'text/html'" class="html-container">
          <div v-html="file"></div>
        </div>
        <div v-else class="text-container">
          <pre>{{ file }}</pre>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="previewMode = false" color="primary" variant="text">Fermer</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else height="600px" width="800px" class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" />
    </v-card>
  </v-dialog>
  
  <!-- Document details dialog -->
  <v-dialog v-model="detailsMode" max-width="1000px" persistent>
    <v-card v-if="selectedDocument" class="document-details-card">
      <v-card-title class="d-flex align-center">
        <span>{{ selectedDocument.title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="detailsMode = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-divider></v-divider>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">Informations générales</h3>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-calendar</v-icon>
                </template>
                <v-list-item-title>Date de création</v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(selectedDocument.creationDateTime) }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="selectedDocument.serviceStartDateTime">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-calendar-clock</v-icon>
                </template>
                <v-list-item-title>Date de l'acte</v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(selectedDocument.serviceStartDateTime) }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-file-document-outline</v-icon>
                </template>
                <v-list-item-title>Type</v-list-item-title>
                <v-list-item-subtitle>{{ selectedDocument.typeCode?.libelle || selectedDocument.type }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-folder-outline</v-icon>
                </template>
                <v-list-item-title>Classe</v-list-item-title>
                <v-list-item-subtitle>{{ selectedDocument.classCodeCode?.libelle || selectedDocument.classCode }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="selectedDocument.comments">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-comment-outline</v-icon>
                </template>
                <v-list-item-title>Commentaires</v-list-item-title>
                <v-list-item-subtitle>{{ selectedDocument.comments }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="selectedDocument.status">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-check-circle-outline</v-icon>
                </template>
                <v-list-item-title>Statut</v-list-item-title>
                <v-list-item-subtitle>{{ selectedDocument.status }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
          
          <v-col cols="12" md="4">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">Auteurs et participants</h3>
            <v-list density="compact">
              <template v-if="selectedDocument.auteurs && selectedDocument.auteurs.length > 0">
                <v-list-item v-for="(auteur, i) in selectedDocument.auteurs" :key="i">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                  </template>
                  <v-list-item-title>Auteur</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ auteur.prenom }} {{ auteur.nom }}
                    <span v-if="auteur.specialite">({{ auteur.specialite }})</span>
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
              
              <v-list-item v-if="selectedDocument.legalAuthenticator">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-account-check</v-icon>
                </template>
                <v-list-item-title>Validateur</v-list-item-title>
                <v-list-item-subtitle>
                  {{ selectedDocument.legalAuthenticator.prenom }} {{ selectedDocument.legalAuthenticator.nom }}
                  <span v-if="selectedDocument.legalAuthenticator.specialite">({{ selectedDocument.legalAuthenticator.specialite }})</span>
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="selectedDocument.executant">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-account-wrench</v-icon>
                </template>
                <v-list-item-title>Exécutant</v-list-item-title>
                <v-list-item-subtitle>
                  {{ selectedDocument.executant.prenom }} {{ selectedDocument.executant.nom }}
                  <span v-if="selectedDocument.executant.specialite">({{ selectedDocument.executant.specialite }})</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
          
          <v-col cols="12" md="4">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">Options de visibilité</h3>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-checkbox v-model="visibilityOptions.patientHidden" color="primary" hide-details></v-checkbox>
                </template>
                <v-list-item-title>Non visible par le patient</v-list-item-title>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-checkbox v-model="visibilityOptions.professionalsHidden" color="primary" hide-details></v-checkbox>
                </template>
                <v-list-item-title>Masqué aux professionnels de santé</v-list-item-title>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-checkbox v-model="visibilityOptions.legalRepsHidden" color="primary" hide-details></v-checkbox>
                </template>
                <v-list-item-title>Non visible pour les représentants légaux</v-list-item-title>
              </v-list-item>
            </v-list>
            
            <h3 class="text-subtitle-1 font-weight-bold mb-2 mt-4">Informations techniques</h3>
            <v-list density="compact">
              <v-list-item v-if="selectedDocument.uniqueId">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-identifier</v-icon>
                </template>
                <v-list-item-title>ID unique</v-list-item-title>
                <v-list-item-subtitle class="text-truncate">{{ selectedDocument.uniqueId }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="selectedDocument.format">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-file-code-outline</v-icon>
                </template>
                <v-list-item-title>Format</v-list-item-title>
                <v-list-item-subtitle>{{ selectedDocument.formatCode?.libelle || selectedDocument.format }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item v-if="selectedDocument.mimeType">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-file-outline</v-icon>
                </template>
                <v-list-item-title>Type MIME</v-list-item-title>
                <v-list-item-subtitle>{{ selectedDocument.mimeType }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-divider></v-divider>
      
      <v-card-actions>
        <v-btn @click="saveVisibilityChanges" color="success" class="mr-2">
          <v-icon left>mdi-content-save</v-icon>
          Enregistrer les modifications
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="detailsMode = false" color="grey">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

      <!-- Loading spinner -->
      <div v-if="isLoading" class="loading-container">
        <v-progress-circular indeterminate color="primary" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useDmpDocumentsController } from '../controllers/dmpDocumentsController';
import { onMounted, ref } from 'vue';

export default {
  name: 'PatientDocuments',
  setup() {
    const {
      documents,
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
      
      fetchDocuments,
      previewFile,
      
      getSortButtonStyle,
      getToggleButtonStyle,
      getViewIcon,
      formatDate,
      getDocumentsNumberTxt,
      getAuthorsNames
    } = useDmpDocumentsController();
    
    // Document details dialog
    const detailsMode = ref(false);
    const selectedDocument = ref(null);
    const selectedDocumentIndex = ref(null);
    
    // Helper function to get author name
    function getAuthorName(document) {
      if (document.auteurs && document.auteurs.length > 0) {
        const author = document.auteurs[0];
        return `${author.prenom} ${author.nom}`;
      } else if (document.legalAuthenticator) {
        return `${document.legalAuthenticator.prenom} ${document.legalAuthenticator.nom}`;
      }
      return 'Non renseigné';
    }
    
    // Visibility options
    const visibilityOptions = ref({
      patientHidden: false,
      professionalsHidden: false,
      legalRepsHidden: false
    });
    
    function showDocumentDetails(document, index) {
      selectedDocument.value = document;
      selectedDocumentIndex.value = index;
      
      // Reset visibility options
      visibilityOptions.value = {
        patientHidden: false,
        professionalsHidden: false,
        legalRepsHidden: false
      };
      
      // Set visibility options based on document confidentiality if available
      if (document.confidentialities && document.confidentialities.length > 0) {
        // This is just a placeholder - in a real app, you would map the confidentiality codes to these options
        visibilityOptions.value.patientHidden = document.confidentialities.includes('R');
        visibilityOptions.value.professionalsHidden = document.confidentialities.includes('V');
        visibilityOptions.value.legalRepsHidden = document.confidentialities.includes('L');
      }
      
      detailsMode.value = true;
    }
    
    function saveVisibilityChanges() {
      console.log('Saving visibility changes for document:', selectedDocument.value.title);
      console.log('New visibility settings:', visibilityOptions.value);
      
      // Here you would implement the actual save functionality
      // For now, we'll just show a notification
      alert(`Modifications de visibilité enregistrées pour le document "${selectedDocument.value.title}"`);
    }
    /* <====== ACTIONS DOCUMENTS ======> */
    // New action methods
    function archiveDocument(document, index) {
      console.log('Archiving document:', document.title, 'at index:', index);
      // TODO
      alert(`Document "${document.title}" archivé`);
    }
    
    function changeVisibility(document, index) {
      console.log('Changing visibility for document:', document.title, 'at index:', index);
      // TODO
      alert(`Visibilité modifiée pour le document "${document.title}"`);
    }
    
    function downloadDocument(document, index) {
      console.log('Downloading document:', document.title, 'at index:', index);
      // TODO
      alert(`Téléchargement du document "${document.title}" en cours...`);
    }
    
    // Toggle sort functions
    function toggleSortByName() {
      sortingType.value = sortingType.value === 0 ? 1 : 0;
      fetchDocuments();
    }
    
    function toggleSortByDate() {
      sortingType.value = sortingType.value === 2 ? 3 : 2;
      fetchDocuments();
    }
    
    // Fetch documents when the component is mounted
    onMounted(() => {
      console.log('PatientDocuments component mounted, fetching documents...');
      fetchDocuments('FindDocuments');
    });

    return {
      documents,
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
      
      detailsMode,
      selectedDocument,
      selectedDocumentIndex,
      showDocumentDetails,
      
      // Visibility options
      visibilityOptions,
      saveVisibilityChanges,
      
      // New action methods
      archiveDocument,
      changeVisibility,
      downloadDocument,
      
      fetchDocuments,
      previewFile,
      toggleSortByName,
      toggleSortByDate,
      
      getSortButtonStyle,
      getToggleButtonStyle,
      getViewIcon,
      formatDate,
      getDocumentsNumberTxt,
      getAuthorsNames,
      getAuthorName
    };
  }
}
</script>

<style scoped>
.documents-card {
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 150px);
  overflow: auto;
}

.document-table {
  border-collapse: separate;
  border-spacing: 0;
}

.document-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.document-row:hover {
  background-color: #f5f5f5;
}

.document-details-card {
  max-height: 80vh;
  overflow-y: auto;
}

.documentCard {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.documentCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.error-message {
  color: red;
  padding: 20px;
  text-align: center;
}

.v-list-item-subtitle {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
}

.actions-cell {
  white-space: nowrap;
  min-width: 180px;
  text-align: center;
}

.actions-cell .v-btn {
  margin: 0 2px;
}
</style>
