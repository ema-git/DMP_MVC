import { defineStore } from 'pinia';
import axios from 'axios';

// Définir le store pour les autorisations
export const useAutorisationStore = defineStore('autorisationStore', {
    state: () => ({
        // Vous pouvez ajouter des états si nécessaire
    }),
    actions: {
        async addAuthorization() {
            try {
                const response = await axios.put(
                    'dmp/td03AddAuthorization',
                    {
                        context: {
                            author: {
                                internalId: '123',
                                rpps: '899700296140',
                                nom: 'MED-CS RPPS0029614',
                                prenom: 'ANNE',
                                role: '10',
                                secteurActivite: 'SA05',
                                specialite: 'G15_10/SM26',
                                service: {
                                    nom: 'Service de traumatologie',
                                },
                                structureSante: {
                                    nom: 'CENTRE DE SANTE RPPS15683',
                                    idNational: '10B0156832',
                                },
                            },
                        },
                        request: {
                            matriculeINS: {
                                valeur: '287080883795737',
                                identifiantSysteme: '1.2.250.1.213.1.4.10',
                            },
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'dmpAuthenticationP12.name': '300000001828615_AUTH',
                            'dmpSignatureP12.name': '300000001828615_SIGN',
                        },
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },

        async removeAuthorization() {
            try {
                const response = await axios.put(
                    'dmp/td03RemoveAuthorization',
                    {
                        context: {
                            author: {
                                internalId: '123',
                                rpps: '899700296140',
                                nom: 'MED-CS RPPS0029614',
                                prenom: 'ANNE',
                                role: '10',
                                secteurActivite: 'SA05',
                                specialite: 'G15_10/SM26',
                                service: {
                                    nom: 'Service de traumatologie',
                                },
                                structureSante: {
                                    nom: 'CENTRE DE SANTE RPPS15683',
                                    idNational: '10B0156832',
                                },
                            },
                        },
                        request: {
                            matriculeINS: {
                                valeur: '287080883795737',
                                identifiantSysteme: '1.2.250.1.213.1.4.10',
                            },
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'dmpAuthenticationP12.name': '300000001828615_AUTH',
                            'dmpSignatureP12.name': '300000001828615_SIGN',
                        },
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
    },
});