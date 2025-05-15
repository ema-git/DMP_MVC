<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="500px"
      height="100%"
      fullscreen
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          rounded="lg"
          v-bind="props"
          variant="outlined"
          :style="filter !== '' ? 'border-color: secondary; color: #FFFFFF; background-color: #8ca9b8;' : 'border-color: #54545454; background-color: #f6f6f6;'"
        >
          <v-icon style="color: secondary">mdi-filter</v-icon>
          Filtres
        </v-btn>
      </template>

      <v-toolbar color="primary" style="position: fixed; top: 0; z-index: 1000; border-top-right-radius: 20px;">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">Modifier les filtres</v-toolbar-title>
        <v-toolbar-items>
          <v-btn style="background-color: #7191a1" @click="filterDoc(), dialog = false">
            filtrer
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="padding-top: 60px; border-top-right-radius: 20px; border-bottom-right-radius: 20px;">
        <v-col>
          <v-list-subheader class="subtitle">Général</v-list-subheader>
          <v-list-item>
            <v-select
              class="mt-2"
              variant="outlined"
              rounded="lg"
              density="compact"
              :items="stats"
              label="Statut du document"
              bg-color="#F6F6F6"
              v-model="dmpDocumentsStore.documentStatus"
            ></v-select>
          </v-list-item>
          <v-list-item>
            <v-row class="mt-0">
              <v-col>
                <v-text-field
                  variant="outlined"
                  label="Soumission du"
                  type="date"
                  clearable
                  rounded="lg"
                  density="compact"
                  bg-color="#F6F6F6"
                  v-model="dmpDocumentsStore.submissionStartDate"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="à"
                  type="time"
                  clearable
                  rounded="lg"
                  variant="outlined"
                  density="compact"
                  bg-color="#F6F6F6"
                  v-model="dmpDocumentsStore.submissionStartTime"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row class="mt-0">
              <v-col>
                <v-text-field
                  clearable
                  rounded="lg"
                  variant="outlined"
                  density="compact"
                  bg-color="#F6F6F6"
                  label="au"
                  type="date"
                  v-model="dmpDocumentsStore.submissionEndDate"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  clearable
                  rounded="lg"
                  variant="outlined"
                  density="compact"
                  bg-color="#F6F6F6"
                  label="à"
                  type="time"
                  v-model="dmpDocumentsStore.submissionEndTime"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row class="mt-0">
              <v-col>
                <v-select
                  clearable
                  rounded="lg"
                  variant="outlined"
                  density="compact"
                  bg-color="#F6F6F6"
                  :items="dmpDocumentsStore.classeDoc"
                  item-title="libelle"
                  return-object
                  label="Catégorie du document"
                  v-model="dmpDocumentsStore.documentCategory"
                  @change="updateTypeDoc"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :disabled="dmpDocumentsStore.documentCategory == null"
                  clearable
                  rounded="lg"
                  variant="outlined"
                  density="compact"
                  bg-color="#F6F6F6"
                  :items="dmpDocumentsStore.getTypeDoc(dmpDocumentsStore.documentCategory?.id)"
                  item-title="libelle"
                  return-object
                  label="Type de document"
                  v-model="dmpDocumentsStore.documentType"
                ></v-select>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider></v-divider>
          <v-expansion-panels multiple>
            <v-expansion-panel>
              <v-expansion-panel-title>Actes</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row class="mt-2">
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="Début de l'acte du"
                      type="date"
                      v-model="dmpDocumentsStore.actFromStartDate"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="à"
                      type="time"
                      v-model="dmpDocumentsStore.actFromStartTime"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="au"
                      type="date"
                      v-model="dmpDocumentsStore.actFromEndDate"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="à"
                      type="time"
                      v-model="dmpDocumentsStore.actFromEndTime"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="mt-2">
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="Fin  de l'acte du"
                      type="date"
                      v-model="dmpDocumentsStore.actToStartDate"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="à"
                      type="time"
                      v-model="dmpDocumentsStore.actToStartTime"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="au"
                      type="date"
                      v-model="dmpDocumentsStore.actToEndDate"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="lg"
                      variant="outlined"
                      density="compact"
                      bg-color="#F6F6F6"
                      label="à"
                      type="time"
                      v-model="dmpDocumentsStore.actToEndTime"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-container class="h-10"></v-container>
          <v-divider></v-divider>
          <v-list-subheader class="subtitle">Visibilité</v-list-subheader>
          <v-list-item
            title="Invisible pour le patient"
            subtitle="Le patient n'a pas accès à ces documents"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="dmpDocumentsStore.invisibleToThePatient"
                color="primary"
              ></v-checkbox>
            </template>
          </v-list-item>
          <v-list-item
            title="Invisible pour les professionnels de santé"
            subtitle="Les professionnels de santé (excepté l'auteur et le médecin traitant) n'ont pas accès à ces documents"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="dmpDocumentsStore.invisibleToTheHealthcareProfessional"
                color="primary"
              ></v-checkbox>
            </template>
          </v-list-item>
          <v-list-item
            title="Invisible pour les représentants légaux"
            subtitle="Les représentants légaux du patient n'ont pas accès à ces documents"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="dmpDocumentsStore.invisibleToLegalRepresentatives"
                color="primary"
              ></v-checkbox>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-subheader class="subtitle">Mes documents transférés</v-list-subheader>
          <v-list-item
            title="Afficher uniquement mes documents"
            subtitle="Seuls les documents que vous avez publiés sur le DMP s'affichent"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="dmpDocumentsStore.showOnlyMyDocuments"
                color="primary"
              ></v-checkbox>
            </template>
          </v-list-item>
        </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore.js';

export default {
  data() {
    return {
      dialog: false,
      filter: "",
      dmpDocumentsStore: useDmpDocumentsStore(),
      stats: ["APPROVED", "DEPRECATED"]
    };
  },

  watch: {
    "dmpDocumentsStore.documentCategory": function (newVal) {
      this.dmpDocumentsStore.documentType = null;
      if (newVal) {
        this.dmpDocumentsStore.getTypeDoc(newVal.id);
      }
    },
  },

  methods: {
    updateTypeDoc() {
      this.dmpDocumentsStore.documentType = null;
      if (this.dmpDocumentsStore.documentCategory) {
        this.dmpDocumentsStore.getTypeDoc(this.dmpDocumentsStore.documentCategory.id);
      }
    },

    filterDoc() {
      this.filter = this.dmpDocumentsStore.getAllActiveFilters();
      console.log(this.filter);
      this.$emit("filter");
      this.dialog = false;
    },
  },
};
</script>

<style>
.dateSelector {
  border: 1px solid #aaaaaa;
  background-color: #f6f6f6;
  border-radius: 10px;
}

.dateSelector:hover {
  border: 1px solid #000000;
}

.title {
  font-weight: 600 !important;
  margin-left: 20px;
}

.subtitle {
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 20px;
}
</style>
