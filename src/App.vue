<script>
import Header from '../src/views/Header.vue'
import Patient from '../src/views/Patient.vue';
import Documents from '../src/views/Documents.vue';
import MenuContextuel from '../src/views/MenuContext.vue';
import Autorisation from '../src/views/Autorisation.vue';

import { useUserStore } from '../src/models/stores/userStore.js';
import { useDmpDocumentsStore } from '../src/models/stores/dmpDocumentsStore.js';
import { DmpServices } from '../src/models/services/dmp.services.js';

export default {
  data() {
        return {
          userStore: useUserStore(),
          dmpDocumentsStore: useDmpDocumentsStore()
        }
      },
  name: 'App',
  components:{
    Header,
    Patient,
    Documents,
    MenuContextuel,
    Autorisation
  },
  methods: {
    formatPatientDate(patient) {
      if (!patient) return '-';
      
      // Check if the patient has dateDeNaissance (from dmpDocumentsStore) or formattedDate (from patientStore)
      if (patient.formattedDate) {
        return patient.formattedDate;
      } else if (patient.dateDeNaissance) {
        const annee = patient.dateDeNaissance.substr(0, 4);
        const mois = patient.dateDeNaissance.substr(4, 2);
        const jour = patient.dateDeNaissance.substr(6, 2);
        return `${jour}/${mois}/${annee}`;
      }
      
      return 'Non renseigné';
    },
    
    getPatientINS(patient) {
      if (!patient) return 'Non disponible';
      
      // Check if the patient has matriculeINS (from dmpDocumentsStore) or ins (from patientStore)
      if (patient.matriculeINS && patient.matriculeINS.valeur) {
        return patient.matriculeINS.valeur;
      } else if (patient.ins) {
        return patient.ins;
      }
      
      return 'Non disponible';
    },
    
    navigateToList() {
      // Navigate back to the list view
      this.dmpDocumentsStore.navigateToPatientList();
      this.$router.push('/');
    }
  },
  mounted() {
    // Exécuter les requêtes de debug au démarrage
    const dmpServices = new DmpServices();
    console.log("Exécution des requêtes de debug au démarrage...");
    
    // Debug info
    console.log("RPPS : " + this.userStore.rpps);
    console.log("InternalID : " + this.userStore.internalId);
    console.log("nom : " + this.userStore.nom);
    console.log("prénom : " + this.userStore.prenom);
    console.log("adeli : " + this.userStore.adeli);
    console.log("secteur activité : " + this.userStore.secteurActivite);

    // Exécution de td03AddAuthorization

    
    // Exécution de td04ListDMPActifs
    console.log("Exécution td04");
    dmpServices.td04ListDMPActifs(this.userStore)
    .then(result => {
      console.log("Résultat de la requête td04", result);
      // Stocker les résultats dans le dmpDocumentsStore pour affichage
      this.dmpDocumentsStore.patients = result;
    })
    .catch(error => {
      console.error("Erreur lors de la td04: ", error)
    });
  }
}
</script>

<template>
  <v-app>
    <div>
        <Header v-if="dmpDocumentsStore.currentView === 'list'"/>
        <router-view></router-view>
    </div>
  </v-app>
</template>

<style scoped>
.patient-detail-card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-list-item {
  margin-bottom: 8px;
}

.v-card-title {
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
  margin-bottom: 16px;
}
</style>
