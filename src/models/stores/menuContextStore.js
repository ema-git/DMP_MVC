// menuContextStore.js
import { defineStore } from 'pinia';
import { DmpServices } from '../services/dmp.services.js';
import { FileServices } from '../services/file.services.js';

const dmpServices = new DmpServices();
const fileServices = new FileServices();

export const useMenuContextStore = defineStore('menuContext', {
  state: () => ({
    options: [
      { action: 'Visualiser les entêtes', icon: 'mdi-information' },
      { action: 'Archiver', icon: 'mdi-archive' },
      { action: 'Modifier la visibilité', icon: 'mdi-eye' },
      { action: 'Télécharger', icon: 'mdi-download' },
    ],
    menuOpen: false,
    dialog: false,
    headers: {
      classCode: { label: 'Catégorie', value: '' },
      typeCode: { label: 'Type', value: '' },
      formatCode: { label: 'Format', value: '' },
      creationDateTime: { label: 'Date d\'ajout sur le DMP', value: '' },
      title: { label: 'Titre', value: '' },
      author: { label: 'Auteur', value: '' },
      confidentialityCode: { label: 'Confidentialité', value: [] },
      speciality: { label: 'Spécialité', value: '' },
      establishment: { label: 'Etablissement', value: '' }
    },
    specialities: []
  }),
  actions: {
    openMenu() {
      this.menuOpen = true;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    async archive() {
      try {
        await dmpServices.td33updateStatus(); // Appelle la méthode pour archiver
      } catch (exception) {
        console.error('Erreur lors de l\'archivage:', exception);
        // TODO: gérer l'exception
      }
    },
    async updateVisibility() {
      try {
        await dmpServices.td33updateConfidentiality(); // Appelle la méthode pour modifier la visibilité
      } catch (exception) {
        console.error('Erreur lors de la mise à jour de la visibilité:', exception);
        // TODO: gérer l'exception
      }
    },
    async fetchSpecialities() {
      try {
        this.specialities = await dmpServices.dmpNomenclatures('AUTHOR_SPECIALITY');
      } catch (exception) {
        console.error('Erreur lors de la récupération des spécialités:', exception);
        // TODO: gérer l'exception
      }
    },
    cleanDate(date) {
      const months = ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
      const dateArray = date.split('-');
      const year = dateArray[0];
      const month = months[parseInt(dateArray[1]) - 1];
      const day = dateArray[2].split('T')[0];
      return `${day} ${month} ${year}`;
    },
    cleanSpeciality(speciality) {
      for (let i = 0; i < this.specialities.length; i++) {
        if (this.specialities[i].valeur === speciality) {
          return this.specialities[i].libelle;
        }
      }
      return 'Spécialité non renseignée';
    },
    checkConfidentiality(category) {
      return !this.headers.confidentialityCode.value.includes(category);
    },
    setHeaders(doc) {
      this.headers.classCode.value = doc.classCodeCode.libelle;
      this.headers.typeCode.value = doc.typeCode.libelle;
      this.headers.formatCode.value = doc.formatCode.libelle;
      this.headers.creationDateTime.value = this.cleanDate(doc.creationDateTime);
      this.headers.title.value = doc.title;
      this.headers.author.value = `${doc.auteurs[0].nom} ${doc.auteurs[0].prenom}`;
      this.headers.confidentialityCode.value = doc.confidentialities;
      this.headers.speciality.value = this.cleanSpeciality(doc.auteurs[0].specialite);
      this.headers.establishment.value = doc.auteurs[0].structureSante.nom;
    }
  }
});