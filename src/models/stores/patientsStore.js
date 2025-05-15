import { defineStore } from 'pinia';
import { DmpServices } from '../services/dmp.services.js';

const dmpServices = new DmpServices();

export const usePatientsStore = defineStore({
  id: 'patientsStore',
  state: () => ({
    patients: [],
    filteredPatients: [],
    isFetching: false,
    showHemaOnly: false,
    testAutorisationPatient: false,
    searchText: null,
    error: null
  }),
  getters: {
    getFilteredPatients(state) {
      // Logique de filtrage
      if (!state.searchText) {
        return state.patients;
      }
      return state.patients.filter((patient) => {
        let patientFullName = `${patient.nomPatronymique} ${patient.prenom}`.toLowerCase();
        return patientFullName.indexOf(state.searchText.toLowerCase()) > -1;
      });
    }
  },
  actions: {
    async fetchPatients(user) {
        this.isFetching = true;
        this.error = null;
/*         try {
            const response = await dmpServices.td04ListDMPActifs(user);
            this.patients = response.map(patient => ({
                ...patient,
                formattedDate: this.convertirFormatDate(patient.dateNaissance), // formatage de la date
            }));
        } catch (err) {
            console.error("Erreur lors de la récupération des patients", err);
            this.error = "Une erreur est survenue lors de la récupération des patients.";
        } finally {
            this.isFetching = false;
        } */
    },
    setSearchText(searchText) {
      this.searchText = searchText;
    },
    clearPatientSelection() {
      this.searchText = null;
      this.filteredPatients = this.patients;
    },
    convertirFormatDate(date) {
        const annee = date.substr(0, 4);
        const mois = date.substr(4, 2);
        const jour = date.substr(6, 2);
        return `${jour}/${mois}/${annee}`;
    },
    updateSelectedPatient(patient) {
      // Implement the logic to update the selected patient
      console.log('Selected patient:', patient);
      // You might want to store the selected patient in the state
      // or perform other actions
    },
  }
});
