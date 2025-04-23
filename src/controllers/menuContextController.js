import { ref } from 'vue'
import { DmpServices } from '@/models/services/dmp.services.js'
import { FileServices } from '@/models/services/file.services.js'
import { useDmpDocumentsStore } from '@/models/stores/dmpDocumentsStore'

// Instances de services (ceci peut aussi se faire dans le setup si besoin)
const dmpServices = new DmpServices()
const fileServices = new FileServices()

// Juste pour centraliser les actions existantes
const Actions = {
  view_headers: 'Visualiser les entêtes',
  archive: 'Archiver',
  change_visibility: 'Modifier la visibilté',
  download: 'Télécharger'
}

/**
 * Composable qui gère la logique "métier" de MenuContext.
 * @param {Number} docIndex - index du document
 * @returns {Object} objets et fonctions utiles au composant
 */
export function useMenuContextController(docIndex) {
  // Références et états internes
  const menuOpen = ref(false)
  const dialog = ref(false)
  const specialities = ref([])

  // Récupération du store
  const dmpDocumentsStore = useDmpDocumentsStore()

  // On stocke les entêtes dans un objet réactif
  const headers = ref({
    classCode: { label: 'Catégorie', value: '' },
    typeCode: { label: 'Type', value: '' },
    formatCode: { label: 'Format', value: '' },
    creationDateTime: { label: 'Date d\'ajout sur le DMP', value: '' },
    title: { label: 'Titre', value: '' },
    author: { label: 'Auteur', value: '' },
    confidentialityCode: { label: 'Confidentialité', value: [] },
    speciality: { label: 'Spécialité', value: '' },
    establishment: { label: 'Etablissement', value: '' }
  })

  // Options du menu
  const options = [
    { action: Actions.view_headers, icon: 'mdi-information' },
    { action: Actions.archive,      icon: 'mdi-archive' },
    { action: Actions.change_visibility, icon: 'mdi-eye' },
    { action: Actions.download,     icon: 'mdi-download' }
  ]

  // Fonctions de "business logic" (ex: archiver, mise à jour de visibilité, etc.)
  async function archive() {
    try {
      // Exemple d’appel
      const td33updateStatusResponse = await dmpServices.td33updateStatus()
      console.log(td33updateStatusResponse)
    } catch (exception) {
      // TODO: gestion d’erreur
      console.error(exception)
    }
  }

  async function updateVisibility() {
    try {
      await dmpServices.td33updateConfidentiality()
    } catch (exception) {
      // TODO: gestion d’erreur
      console.error(exception)
    }
  }

  function download() {
    fileServices.download(docIndex)
  }

  // Fonctions d’UI
  function openContextMenu(event) {
    event.preventDefault()
    menuOpen.value = true
  }

  function closeContextMenu() {
    menuOpen.value = false
  }

  // Helpers de nettoyage / transformation
  function cleanDate(date) {
    if (!date) return ''
    const months = ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']
    const dateArray = date.split('-')
    const year = dateArray[0]
    const month = months[parseInt(dateArray[1]) - 1] || ''
    const day = dateArray[2]?.split('T')[0] || ''
    return `${day} ${month} ${year}`
  }

  function cleanSpeciality(spec) {
    // On cherche la spécialité dans specialities.value
    const found = specialities.value.find(s => s.valeur === spec)
    return found ? found.libelle : 'Spécialité non renseignée'
  }

  function checkConfidentiality(category) {
    return !headers.value.confidentialityCode.value.includes(category)
  }

  // Affichage des entêtes
  async function visualiserEntetes() {
    try {
      // Charger la liste de spécialités
      specialities.value = await dmpServices.dmpNomenclatures('AUTHOR_SPECIALITY')

      // Charger depuis le store le document concerné
      const doc = dmpDocumentsStore.documents[docIndex]
      if (!doc) return

      headers.value.classCode.value = doc.classCodeCode.libelle
      headers.value.typeCode.value = doc.typeCode.libelle
      headers.value.formatCode.value = doc.formatCode.libelle
      headers.value.creationDateTime.value = cleanDate(doc.creationDateTime)
      headers.value.title.value = doc.title
      headers.value.author.value = doc.auteurs[0].nom + ' ' + doc.auteurs[0].prenom
      headers.value.confidentialityCode.value = doc.confidentialities
      headers.value.speciality.value = cleanSpeciality(doc.auteurs[0].specialite)
      headers.value.establishment.value = doc.auteurs[0].structureSante.nom

      dialog.value = true
    } catch (exception) {
      // TODO: gestion d’erreur
      console.error(exception)
    }
  }

  // Orchestration quand on clique sur une option du menu
  function executeOption(action) {
    switch (action) {
      case Actions.view_headers:
        visualiserEntetes()
        break
      case Actions.archive:
        archive()
        break
      case Actions.change_visibility:
        updateVisibility()
        break
      case Actions.download:
        download()
        break
      default:
        break
    }
    menuOpen.value = false
  }

  // On expose toutes les propriétés/méthodes dont le composant a besoin
  return {
    options,
    menuOpen,
    dialog,
    headers,
    specialities,

    openContextMenu,
    closeContextMenu,
    executeOption,
    checkConfidentiality
  }
}
