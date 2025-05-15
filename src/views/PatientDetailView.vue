<template>
  <div>
    <PatientDetailHeader />
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <PatientDocuments />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PatientDocuments from './PatientDocuments.vue';
import PatientDetailHeader from './PatientDetailHeader.vue';
import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore';

export default {
  name: 'PatientDetailView',
  components: {
    PatientDocuments,
    PatientDetailHeader
  },
  setup() {
    const dmpDocumentsStore = useDmpDocumentsStore();
    
    return {
      dmpDocumentsStore
    };
  }
}
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
