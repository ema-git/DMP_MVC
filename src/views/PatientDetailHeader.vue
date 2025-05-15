<script>
import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore.js';
import { useUserStore } from '../models/stores/userStore.js';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      dmpDocumentsStore: useDmpDocumentsStore(),
      userStore: useUserStore(),
      router: useRouter()
    };
  },
  methods: {
    getLegalAuthenticatorFullName() {
      return `${this.userStore.nom} ${this.userStore.prenom}`;
    },
    getLegalAuthenticatorRoleAndRPPS() {
      return `${this.userStore.specialite} | RPPS: ${this.userStore.rpps}`;
    },
    getPatientFullName() {
      if (!this.dmpDocumentsStore.patient) return '';
      return `${this.dmpDocumentsStore.patient.prenom} ${this.dmpDocumentsStore.patient.nomPatronymique}`;
    },
    getPatientDetails() {
      if (!this.dmpDocumentsStore.patient) return '';
      
      const patient = this.dmpDocumentsStore.patient;
      const details = [];
      
      // Add gender if available
      if (patient.sexe) {
        details.push(`Sexe: ${patient.sexe}`);
      }
      
      // Add date of birth if available
      if (patient.dateDeNaissance) {
        const annee = patient.dateDeNaissance.substr(0, 4);
        const mois = patient.dateDeNaissance.substr(4, 2);
        const jour = patient.dateDeNaissance.substr(6, 2);
        details.push(`Né(e) le: ${jour}/${mois}/${annee}`);
      } else if (patient.formattedDate) {
        details.push(`Né(e) le: ${patient.formattedDate}`);
      }
      
      // Add INS if available
      if (patient.matriculeINS && patient.matriculeINS.valeur) {
        details.push(`INS: ${patient.matriculeINS.valeur}`);
      } else if (patient.ins) {
        details.push(`INS: ${patient.ins}`);
      }
      
      return details.join(' | ');
    },
    navigateToList() {
      this.dmpDocumentsStore.navigateToPatientList();
      this.router.push('/');
    }
  }
};
</script>

<template>
  <v-toolbar color="#8ca9b8">
    <v-btn 
      prepend-icon="mdi-arrow-left" 
      @click="navigateToList"
      class="mr-4"
      variant="text"
      color="white"
    >
      Retour
    </v-btn>
    
    <div class="d-flex align-center">
      <v-avatar class="mr-3" color="grey-lighten-1" size="40">
        <v-icon icon="mdi-account"></v-icon>
      </v-avatar>
      <div>
        <div class="text-h6 text-white">{{ getPatientFullName() }}</div>
        <div class="text-caption text-white">{{ getPatientDetails() }}</div>
      </div>
    </div>
    
    <v-spacer></v-spacer>
    
    <v-icon
      size="x-large"
      icon="mdi-account-circle"
    ></v-icon>
    <v-list-item
      class="text-white"
      lines="three"
      :title="getLegalAuthenticatorFullName()"
      :subtitle="getLegalAuthenticatorRoleAndRPPS()"
    ></v-list-item>
  </v-toolbar>
</template>

<style scoped>
.v-toolbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
