// controllers/autorisationController.js

import { ref, watch } from 'vue'
import { useAutorisationStore } from '@/models/stores/Autorisation'

/**
 * Composable qui encapsule la logique d'autorisation
 */
export function useAutorisationController() {
  const hidden = ref(true)
  const checkbox = ref(false)
  
  // On récupère le store Pinia
  const autorisationStore = useAutorisationStore()

  // Actions possibles
  function addAuthorization() {
    autorisationStore.addAuthorization()
  }

  function removeAuthorization() {
    autorisationStore.removeAuthorization()
  }

  function validateAuthorization() {
    if (!checkbox.value) {
      console.log("Veuillez recueillir le consentement du patient")
    } else {
      addAuthorization()
      console.log("L'autorisation a été donnée")
    }
  }

  // On surveille le changement de checkbox
  watch(checkbox, newValue => {
    // Si on coche la case, on appelle addAuthorization()
    if (newValue) {
      addAuthorization()
    }
  })

  return {
    hidden,
    checkbox,
    addAuthorization,
    removeAuthorization,
    validateAuthorization
  }
}
