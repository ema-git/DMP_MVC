<template>
    <v-container>
        <div v-if="patientStore.error">
            <Snackbar
                :show="true"
                message="patientStore.error"
            />
        </div>
        <v-row>
            <!-- Affichage des patients depuis patientStore -->
            <v-col v-for="patient in patientStore.patients" :key="'ps-' + patient.ins" cols="5" sm="4" md="2">
                <v-card 
                    @click="selectPatient(patient, 'patientStore')" 
                    @dblclick="navigateToPatientDetail(patient, 'patientStore')"
                    :class="{ 'selected-patient': isSelectedPatient(patient, 'patientStore') }"
                >
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
            
            <!-- Affichage des patients depuis dmpDocumentsStore (résultats de td04) -->
            <v-col v-for="(patient, index) in dmpDocumentsStore.patients" :key="'dmp-' + (patient.matriculeINS ? patient.matriculeINS.valeur : index)" cols="5" sm="4" md="2">
                <v-card 
                    @click="selectPatient(patient, 'dmpDocumentsStore')" 
                    @dblclick="navigateToPatientDetail(patient, 'dmpDocumentsStore')"
                    :class="{ 'selected-patient': isSelectedPatient(patient, 'dmpDocumentsStore') }"
                >
                    <v-card-title id="title">
                        {{ patient.prenom }} {{ patient.nomPatronymique }} <!-- entête de la carte patient -->
                    </v-card-title>
                    <v-card-text>
                        <v-avatar image="photoProfil.jpg" id="profil" size="50"></v-avatar>
                        <div v-if="patient.sexe">Sexe : {{ patient.sexe }}</div>
                        Date de naissance : {{ formatDate(patient.dateDeNaissance) }}<br>
                        n° INS: {{ patient.matriculeINS ? patient.matriculeINS.valeur : 'Non disponible' }}
                        <v-card-subtitle id="Statut">{{ patient.role || 'ACTIF' }}</v-card-subtitle>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { usePatientsStore } from '../models/stores/patientsStore';
import { useUserStore } from '../models/stores/userStore';
import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore';
import Snackbar from './Snackbar.vue';
import { useRouter } from 'vue-router';

export default {
    components: {
        Snackbar
    },
    setup() {
        const patientStore = usePatientsStore();
        const userStore = useUserStore();
        const dmpDocumentsStore = useDmpDocumentsStore();
        const router = useRouter();

        // Appelle l'action pour récupérer les patients
        patientStore.fetchPatients(userStore);

        return {
            patientStore,
            dmpDocumentsStore,
            router
        };
    },
    methods: {
        formatDate(date) {
            if (!date) return '-';
            const annee = date.substr(0, 4);
            const mois = date.substr(4, 2);
            const jour = date.substr(6, 2);
            return `${jour}/${mois}/${annee}`;
        },
        selectPatient(patient, source) {
            // Sélectionner le patient dans le dmpDocumentsStore
            this.dmpDocumentsStore.selectPatient(patient);
            
            // Si le patient vient du patientStore, mettre à jour également le patientStore
            if (source === 'patientStore') {
                this.patientStore.updateSelectedPatient(patient);
            }
            
            console.log(`Patient sélectionné depuis ${source}:`, patient);
        },
        isSelectedPatient(patient, source) {
            // Vérifier si ce patient est le patient actuellement sélectionné
            if (!this.dmpDocumentsStore.patient) return false;
            
            // Obtenir l'identifiant du patient sélectionné
            const selectedPatientId = this.dmpDocumentsStore.patient.matriculeINS 
                ? this.dmpDocumentsStore.patient.matriculeINS.valeur 
                : this.dmpDocumentsStore.patient.ins;
            
            // Obtenir l'identifiant du patient courant
            const currentPatientId = patient.matriculeINS 
                ? patient.matriculeINS.valeur 
                : patient.ins;
            
            // Comparer les identifiants
            return selectedPatientId === currentPatientId;
        },
        navigateToPatientDetail(patient, source) {
            // Sélectionner le patient dans le dmpDocumentsStore et naviguer vers la vue détaillée
            this.dmpDocumentsStore.navigateToPatientDetail(patient);
            
            // Si le patient vient du patientStore, mettre à jour également le patientStore
            if (source === 'patientStore') {
                this.patientStore.updateSelectedPatient(patient);
            }
            
            // Créer une URL à partir du nom du patient
            const patientUrl = `${patient.prenom}${patient.nomPatronymique}`.replace(/\s+/g, '');
            
            // Naviguer vers la page détaillée du patient
            this.router.push(`/${patientUrl}`);
            
            console.log(`Navigation vers la vue détaillée du patient depuis ${source}:`, patient);
        }
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
.selected-patient {
    border: 2px solid #1976d2;
    background-color: #e3f2fd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.v-card {
    cursor: pointer;
    transition: all 0.3s ease;
}
.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
