<template>
    <v-container>
        <div v-if="patientStore.error">
            <Snackbar
                :show="true"
                message="patientStore.error"
            />
        </div>
        <v-row>
            <v-col v-for="patient in patientStore.patients" :key="patient.ins" cols="5" sm="4" md="2">
                <v-card>
                    <v-card-title id="title">
                        {{ patient.prenom }} {{ patient.nomPatronymique }} <!-- entête de la carte patient -->
                    </v-card-title>
                    <v-card-text>
                        <v-avatar image="photoProfil.jpg" id="profil" size="50"></v-avatar>
                        Sexe : {{ patient.sexe }}<br>
                        Date de naissance : {{ patient.formattedDate }}<br>
                        n° INS: {{ patient.ins }}
                        <v-card-subtitle id="Statut">ACTIF</v-card-subtitle>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { usePatientsStore } from '../models/stores/patientsStore';
import { useUserStore } from '../models/stores/userStore';
import Snackbar from './Snackbar.vue';

export default {
    components: {
        Snackbar
    },
    setup() {
        const patientStore = usePatientsStore();
        const userStore = useUserStore();

        // Appelle l'action pour récupérer les patients
        patientStore.fetchPatients(userStore.internalId);

        return {
            patientStore
        };
    }
}
</script>

<style scoped>
#title {
    text-align: center;
}
#Statut {
    text-align: center;
}
</style>
