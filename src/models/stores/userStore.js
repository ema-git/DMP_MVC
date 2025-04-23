import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        adeli: "02101317",
        rpps: "899700296140",
        internalId: "123",
        nom: "MED-CS RPPS0029614",
        prenom: "ANNE",
        role: "10",
        specialite: "G15_10/SM30",
        secteurActivite: "SA26"
    }),
    getters: {},
    actions: {}
});
