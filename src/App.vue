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
  methods: {},
  mounted() {
    //Exécuter la requête td04List au démarrage
    const dmpServices = new DmpServices();
    console.log("execution td03");
    console.log("RPPS : " + this.userStore.rpps);
    console.log("InternalID : " + this.userStore.internalId);
    console.log("nom : " + this.userStore.nom);
    console.log("prénom : " + this.userStore.prenom);
    console.log("adeli : " + this.userStore.adeli);
    console.log("secteur activité : " + this.userStore.secteurActivite);


    dmpServices.td03AddAuthorization(this.userStore)
    .then(result => {
      console.log("Résultat de la requete td03", result);
    })
    .catch(error => {
      console.error("Erreur lors de la td03: ", error)
    });
/*     console.log("Exécution td04");
     dmpServices.td04ListDMPActifs(this.userStore)
    .then(result => {
      console.log("Résultat de la requete td04", result);
    })
    .catch(error => {
      console.error("Erreur lors de la td04: ", error)
    });  */
    // Exécuter la requête td02Exist au démarrage du site
/*     const dmpServices = new DmpServices();
    console.log("Exécution de la requête td02Exist au démarrage...");
    dmpServices.td02Exist(this.userStore, "", "")
      .then(result => {
        console.log("Résultat de la requête td02Exist:", result);
      })
      .catch(error => {
        console.error("Erreur lors de la requête td02Exist:", error);
      }); */
  }
}
</script>

<template>
  <v-app>
    <div>
        <Header/>
        <Patient/>
        <div 
          v-if="dmpDocumentsStore.patient == null"
          class="flex m-auto text-center"
        >
          Veuillez sélectionner un patient.
        </div>
        <Documents v-else="dmpDocumentsStore.patient != null"/>
        <!--
        TODO
      <div>
        <Autorisation/>
      </div>
        -->
    </div>
  </v-app>
</template>
