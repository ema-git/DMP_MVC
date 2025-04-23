<script>
    import Patients from './Patients.vue';
    import { useUserStore } from '../models/stores/userStore.js';
    export default {
        components: {
            Patients
        },
        data() {
            return {
                userStore: useUserStore()
            }
        },
        methods: {
            getLegalAuthenticatorFullName() {
                return `${this.userStore.nom} ${this.userStore.prenom}`;
            },
            getLegalAuthenticatorRoleAndRPPS() {
                return `${this.userStore.specialite} | RPPS: ${this.userStore.rpps}`;
            }
        }
    }
</script>

<template>
    <v-toolbar color=#8ca9b8>
        <Patients class="mt-6 mx-3"></Patients>
        <v-spacer></v-spacer>
        <v-icon
          size="x-large"
          icon="mdi-account-circle"
        ></v-icon>
        <v-list-item
            class="text-white"
            lines="three"
            :title="getLegalAuthenticatorFullName()"
            :subtitle="getLegalAuthenticatorRoleAndRPPS()"
        ></v-list-item>
    </v-toolbar>
</template>
