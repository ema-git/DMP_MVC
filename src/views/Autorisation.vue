<template>
    <v-col cols="4">
      <v-card v-show="hidden">
        <v-card-title>
          <span class="text-h6">Le patient vous donne-t-il le droit de consulter son DMP ?</span>
        </v-card-title>
        <v-card-text>
          <!-- Checkbox obligatoire pour pouvoir consulter le DMP du patient choisi -->
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'Le patient doit donner son accord !']"
            label="Le/la patient(e) atteste me donner le droit de consulter son dossier médical partagé."
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" @click="removeAuthorization">
            Annuler
          </v-btn>
          <v-btn color="green" @click="validateAuthorization">
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </template>
  
  <script setup>
  import { useAutorisationController } from '../controllers/autorisationController.js';
  

  const {
    hidden,
    checkbox,
    removeAuthorization,
    validateAuthorization
  } = useAutorisationController()
  </script>
  