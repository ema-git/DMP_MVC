<template>
  <div class="searchComponent">
    <div v-if="!patientsStore.isFetching">
      <v-select
        return-object
        :item-title="getPatientFullName"
        item-value="NUMPAT"
        label="Mon patient"
        :items="patientsStore.getFilteredPatients"
        clearable
        open-on-clear
        variant="outlined"
        density="compact"
        rounded="lg"
        bg-color="secondary"
        no-data-text="Aucun patient trouvé"
        @click:clear="onClearPatient"
        @update:modelValue="onPatientSelection"
      >
        <template v-slot:prepend-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                variant="outlined"
                density="compact"
                rounded="lg"
                v-model="patientsStore.searchText"
                placeholder="Entrez le nom d'un patient..."
                @input="filterPatients"
                clearable
              />
            </v-list-item-content>
          </v-list-item>
          <v-checkbox
            v-model="patientsStore.showHemaOnly"
            class="ml-3"
            label="Afficher uniquement les patients Hemadialyse"
            density="compact"
            hide-details
          />
          <v-checkbox
            v-model="patientsStore.testAutorisationPatient"
            class="ml-3"
            label="Test autorisation patient"
            density="com
            pact"
            hide-details
          />
          <v-divider class="mx-3"></v-divider>
        </template>
      </v-select>
    </div>
    <div v-else>
      Recherche des patients...
      <v-progress-linear height="1" indeterminate></v-progress-linear>
    </div>
    <div class="text-center">
      <Snackbar
        v-if="patientsStore.error"
        :show="true"
        button-label="Réessayer"
        message="patientsStore.error"
        @on-button-tapped="fetchPatients"
      />
    </div>
  </div>
</template>

<script>
import { usePatientsStore } from '../models/stores/patientsStore';
import { useUserStore } from '../models/stores/userStore';
import Snackbar from './Snackbar.vue';

export default {
  components: {
    Snackbar
  },
  setup() {
    const patientsStore = usePatientsStore();
    const userStore = useUserStore();

    // Appelle l'action pour récupérer les patients
    patientsStore.fetchPatients(userStore.internalId);

    return {
      patientsStore
    };
  },
  methods: {
    onClearPatient() {
      this.patientsStore.clearPatientSelection();
    },
    onPatientSelection(selectedPatient) {
      this.patientsStore.updateSelectedPatient(selectedPatient);
    },
    filterPatients() {
      // Met à jour le texte de recherche dans le store
      this.patientsStore.setSearchText(this.patientsStore.searchText);
    },
    getPatientFullName(patient) {
      return `${patient.nomPatronymique} ${patient.prenom}`;
    },
    fetchPatients() {
      const userStore = useUserStore();
      this.patientsStore.fetchPatients(userStore.internalId);
    }
  }
};
</script>

<style scoped>
.searchComponent {
  min-width: 30%;
  max-width: 40%;
}
</style>
