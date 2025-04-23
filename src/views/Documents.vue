<template>
  <!-- Composant ErrorFetch pour gérer l'erreur d'API -->
  <ErrorFetch
    v-show="error"
    :message="error"
    @on-button-tapped="checkDMPExistanceAndFetchDocuments"
  />
  <ErrorFetch
    v-show="isDmpInactive"
    :message="dmpInactiveReason"
    button-text="Activer"
    @on-button-tapped="console.log('APPEL DE LA TD03 !')"
  />

  <v-row v-show="!error" class="align-center mx-5">
    <div class="mx-1 float-left">
      <Filtres @filter="fetchDocuments" @click="toggleFilter" />
    </div>
    <div class="mr-5" style="width: 1px; height: 35px; background-color: #54545454"></div>
    
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

    <v-btn-toggle
      v-model="selectedViewIndex"
      mandatory
      variant="outlined"
      rounded="lg"
      style="border-color: #54545454"
    >
      <v-btn height="35px" icon="mdi-view-headline" :style="getToggleButtonStyle(0)" />
      <v-btn height="35px" :icon="getViewIcon()" :style="getToggleButtonStyle(1)" />
    </v-btn-toggle>
  </v-row>

  <v-row v-if="!isLoading" class="mx-3">
    <v-col>
      <!-- Vue en "grid" -->
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
                <MenuContext :docIndex="index" @close="() => {}" />
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

      <!-- Vue en "liste" (table) -->
      <v-table v-show="selectedViewIndex === 0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Commentaires</th>
            <th>Auteurs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(document, index) in documents"
            :key="document.internalId ?? index"
          >
            <td>{{ formatDate(document.creationDateTime) }}</td>
            <td>{{ document.title }}</td>
            <td>{{ document.comments }}</td>
            <td>{{ getAuthorsNames(document.auteurs) }}</td>
            <td>
              <v-btn
                @click="previewFile(index)"
                :disabled="downloadIndex === index || previewLoading"
                icon
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                @click="downloadFile(index)"
                :disabled="downloadIndex === index || previewLoading"
                icon
              >
                <!-- Quand on télécharge : icône "progress" -->
                <v-icon v-if="downloadIndex === index">mdi-progress-download</v-icon>
                <v-icon v-else>mdi-download</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>

  <!-- Dialog de prévisualisation du fichier -->
  <v-dialog v-if="previewedFileIndex != null" v-model="previewMode" max-width="800px">
    <v-card v-if="!previewLoading" height="600px" width="800px">
      <FilePreview
        :documentContent="file"
        :documentType="fileType"
        :fileName="fileName"
      />
    </v-card>
    <v-card v-else height="600px" width="800px">
      <v-progress-circular indeterminate color="primary" />
    </v-card>
  </v-dialog>

  <!-- Spinner global -->
  <v-progress-circular v-show="isLoading" indeterminate color="primary" />
</template>

<script setup>
import MenuContext from './MenuContext.vue';
import Filtres from './Filtres.vue';
import ErrorFetch from './ErrorFetch.vue';
import FilePreview from './FilePreview.vue';

import { useDocumentsController } from '../controllers/documentsController.js';

// Récupération de toutes les données & méthodes depuis le controller
const {
  documents,
  isLoading,
  error,
  isDmpInactive,
  dmpInactiveReason,

  selectedViewIndex,
  sortingType,
  previewMode,
  previewLoading,
  previewedFileIndex,
  file,
  fileType,
  fileName,
  downloadIndex,

  checkDMPExistanceAndFetchDocuments,
  fetchDocuments,
  previewFile,
  downloadFile,
  toggleFilter,
  toggleSortByName,
  toggleSortByDate,

  getSortButtonStyle,
  getToggleButtonStyle,
  getViewIcon,
  formatDate,
  getDocumentsNumberTxt,
  getAuthorsNames
} = useDocumentsController()

</script>