<template>
  <div>
    <v-menu style="position: relative;">
      <template #activator="{ props }">
        <v-btn 
          rounded="lg"
          v-bind="props"
          variant="outlined"
          style="border-color: #54545454; background-color: #ffffff;"
        > 
          <v-icon style="color: secondary;">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list rounded="lg">
        <v-list-item
          v-for="option in options"
          :key="option.action"
          :value="option.action"
          class="contextMenuItem"
        >
          <v-list-item-title @click="executeOption(option.action)">
            <v-icon color="#718893">{{ option.icon }}</v-icon> 
            <span style="margin-left: 10px;">{{ option.action }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Dialog pour afficher les entêtes du document -->
    <v-dialog
      v-model="dialog"
      max-width="500px"
      width="500px"
      height="100%"
      fullscreen
      absolute
      class="right"
      transition="slide-x-reverse-transition"
    >
      <v-toolbar color="primary" style="border-top-left-radius: 20px;">
        <v-icon class="ml-5" icon dark size="30px">mdi-file-document-multiple-outline</v-icon>
        <v-toolbar-title style="font-weight: 600;">{{ headers.title.value }}</v-toolbar-title>
        <v-toolbar-items>
          <v-btn @click="dialog = false">
            <v-icon size="30px">mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card style="min-height: 0px; height: 100%; border-bottom-left-radius: 20px;">
        <div>
          <div class="subtitle">Visibilité</div>
          <div class="center">
            <v-row class="mb-2 mt-0">
              <div class="center">
                <v-icon size="50" color="secondary">mdi-doctor</v-icon>
                <div class="itemTitle">
                  Professionnels <br>de santé
                </div>
                <div
                  class="bordered"
                  :class="checkConfidentiality('INVISIBLE_PS') ? 'green' : 'red'"
                >
                  <v-icon size="30">
                    {{ checkConfidentiality('INVISIBLE_PS') ? 'mdi-check' : 'mdi-close' }}
                  </v-icon>
                </div>
              </div>

              <div class="center ml-10 mr-10">
                <v-icon size="50" color="secondary">mdi-account</v-icon>
                <div class="mt-2 mb-3 itemTitle">Patient</div>
                <div
                  class="bordered"
                  :class="checkConfidentiality('INVISIBLE_PATIENT') ? 'green' : 'red'"
                >
                  <v-icon size="30">
                    {{ checkConfidentiality('INVISIBLE_PATIENT') ? 'mdi-check' : 'mdi-close' }}
                  </v-icon>
                </div>
              </div>

              <div class="center">
                <v-icon size="50" color="secondary">mdi-account-child</v-icon>
                <div class="itemTitle">Représentants<br> Légaux</div>
                <div
                  class="bordered"
                  :class="checkConfidentiality('INVISIBLE_REPRESENTANTS_LEGAUX') ? 'green' : 'red'"
                >
                  <v-icon size="30">
                    {{ checkConfidentiality('INVISIBLE_REPRESENTANTS_LEGAUX') ? 'mdi-check' : 'mdi-close' }}
                  </v-icon>
                </div>
              </div>
            </v-row>
          </div>

          <v-divider color="#000" thickness="2"></v-divider>

          <div class="subtitle">Détails du fichier</div>
          <div v-for="(header, key) in headers" :key="key" class="mb-3 ml-5">
            <div v-if="header.label !== 'Confidentialité'">
              <div class="itemTitle">{{ header.label }}</div>
              <div class="item">{{ header.value }}</div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// Import du composable "controller"
import '../theme/MenuContext.css';
import { onMounted, onBeforeUnmount } from 'vue';
import { useMenuContextController } from '../controllers/menuContextController';

// On déclare les props via la Composition API
const props = defineProps({
  docIndex: {
    type: Number,
    required: true
  }
})

// On récupère toutes les fonctions / data depuis notre controller
const {
  options,
  menuOpen,
  dialog,
  headers,
  specialities,
  openContextMenu,
  closeContextMenu,
  executeOption,
  checkConfidentiality
} = useMenuContextController(props.docIndex)

// On écoute l'événement "contextmenu" au montage
onMounted(() => {
  document.addEventListener('contextmenu', openContextMenu)
})
onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', openContextMenu)
})
</script>