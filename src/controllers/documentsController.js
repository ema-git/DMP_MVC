// controllers/documentsController.js

import { computed, ref, onMounted } from 'vue'
import { useDocumentsStore } from '@/models/stores/documentsStorePinia'

export function useDocumentsController() {
  // On récupère l'instance du store Pinia
  const store = useDocumentsStore()

  // GETTERS depuis le store Pinia
  const documents = computed(() => store.documents)
  const isLoading = computed(() => store.isLoading)
  const error = computed(() => store.error)
  const isDmpInactive = computed(() => store.isDmpInactive)
  const dmpInactiveReason = computed(() => store.dmpInactiveReason)

  // ÉTATS LOCAUX du composant (auparavant dans data())
  const selectedViewIndex = ref(0)
  const sortingType = ref(0)
  const previewMode = ref(false)
  const previewLoading = ref(false)
  const previewedFileIndex = ref(null)
  const file = ref('')
  const fileType = ref('')
  const fileName = ref('')
  const downloadIndex = ref(null)

  // ACTIONS store
  function checkDMPExistanceAndFetchDocuments() {
    store.checkDMPExistanceAndFetchDocuments()
  }
  function fetchDocuments() {
    store.fetchDocuments()
  }
  function previewFile(index) {
    store.previewFile(index)
    // Tu peux gérer ici previewLoading ou la récupération du contenu, etc.
    previewedFileIndex.value = index
    previewMode.value = true
  }
  function downloadFile(index) {
    downloadIndex.value = index
    store.downloadFile(index).finally(() => {
      downloadIndex.value = null
    })
  }

  // MUTATIONS store : tri / toggle (deviennent des actions dans Pinia)
  function toggleFilter() {
    store.toggleFilterVisibility()
  }
  function toggleSortByName() {
    store.toggleSortByName()
  }
  function toggleSortByDate() {
    store.toggleSortByDate()
  }

  // MÉTHODES utilitaires
  function getSortButtonStyle(type1, type2) {
    // On compare sortingType.value
    if (sortingType.value === type1 || sortingType.value === type2) {
      return 'background-color: #8ca9b8; color: #fff'
    }
    return 'background-color: #f6f6f6'
  }
  function getToggleButtonStyle(index) {
    return selectedViewIndex.value === index
      ? 'background-color: #8ca9b8; color: #fff'
      : 'background-color: #f6f6f6'
  }
  function getViewIcon() {
    return selectedViewIndex.value ? 'mdi-view-grid' : 'mdi-view-grid-outline'
  }
  function formatDate(dateString) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr').format(date)
  }
  function getDocumentsNumberTxt() {
    const count = documents.value.length
    return `${count} document${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`
  }
  function getAuthorsNames(authors) {
    return authors.map(a => `${a.nom} ${a.prenom}`).join(', ')
  }

  // Hook monté (équivalent de created() ou mounted())
  onMounted(() => {
    checkDMPExistanceAndFetchDocuments()
  })

  // On retourne toutes les propriétés que le composant utilisera
  return {
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

    // Actions
    checkDMPExistanceAndFetchDocuments,
    fetchDocuments,
    previewFile,
    downloadFile,
    toggleFilter,
    toggleSortByName,
    toggleSortByDate,

    // Méthodes utilitaires
    getSortButtonStyle,
    getToggleButtonStyle,
    getViewIcon,
    formatDate,
    getDocumentsNumberTxt,
    getAuthorsNames
  }
}
