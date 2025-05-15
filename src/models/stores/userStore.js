import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        //adeli: "02101317",
        rpps: "899700433156",
        internalId: "123",
        nom: "MEDECIN RPPS0043315",
        prenom: "VIRGINIE",
        role: "10",
        specialite: "G15_10/SM26",
        secteurActivite: "SA07"
    }),
    getters: {},
    actions: {}
});
