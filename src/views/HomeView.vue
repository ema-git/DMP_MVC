<template>
  <div>
    <Patient/>
    <div 
      v-if="dmpDocumentsStore.patient == null"
      class="flex m-auto text-center"
    >
      Veuillez sélectionner un patient.
    </div>
    <Documents v-else="dmpDocumentsStore.patient != null"/>
  </div>
</template>

<script>
import Patient from './Patient.vue';
import Documents from './Documents.vue';
import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore';

export default {
  name: 'HomeView',
  components: {
    Patient,
    Documents
  },
  setup() {
    const dmpDocumentsStore = useDmpDocumentsStore();
    
    return {
      dmpDocumentsStore
    };
  }
}
</script>
