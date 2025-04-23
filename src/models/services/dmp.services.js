import axios from 'axios';
import axiosResponse from 'axios';
import { useDmpDocumentsStore } from '../stores/dmpDocumentsStore';

export class DmpServices {

    constructor() { }

    createDmpHeaders(contentType = "application/json", 
        dmpAuthenticationP12 = "MIIcYQIBAzCCHCcGCSqGSIb3DQEHAaCCHBgEghwUMIIcEDCCFscGCSqGSIb3DQEHAaCCFrgEgha0MIIWsDCCCJgGCyqGSIb3DQEMCgEDoIIIYDCCCFwGCiqGSIb3DQEJFgGggghMBIIISDCCCEQwggYsoAMCAQICEHeovfH6oN2OwfHXyFvg+jUwDQYJKoZIhvcNAQELBQAwgYoxCzAJBgNVBAYTAkZSMRMwEQYDVQQKDApBU0lQLVNBTlRFMRcwFQYDVQQLDA4wMDAyIDE4NzUxMjc1MTEXMBUGA1UECwwOSUdDLVNBTlRFIFRFU1QxNDAyBgNVBAMMK1RFU1QgQUMgSUdDLVNBTlRFIEVMRU1FTlRBSVJFIE9SR0FOSVNBVElPTlMwHhcNMjUwNDAzMTUzMzAwWhcNMjgwNDAzMTUzMzAwWjBkMQswCQYDVQQGEwJGUjETMBEGA1UECAwKUGFyaXMgKDc1KTEdMBsGA1UECgwUSE9QSVRBTCBERVMgMy4gREFNRVMxEzARBgNVBAsMCjExQjAwNzMxNjAxDDAKBgNVBAMMA0VNQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKrdBXKPzWEpiQbNqBkXnm6EIvg+vlR7xZMdcQzYRcUQAlBTboFw17e7LbC49yNF1HDgeTmlzboPydMd1qgCCpD0vdxOQiWguu2zGnHdkVIouUpGrLnF3RewrXyUIiNE3QLCyEbLizqV7fZqoz0CuYheZz5rpV2UxsefzPndQ8iSbGNx9fgGQt35laqvRpPWpNU0XrWWmjeYDlEaEdG5Bg3DEfPY6uxEKhquh+WLjuSwtvnw8Dq3ko+H7rdJlAIB54hzC0NX//zQwoFgjtVmpz/2nqA5OvdM9dySRhDoiazHgw/F18lAL/rMl3VO33rnejZaH6xYojKpxOQ3n4I2BRMCAwEAAaOCA8kwggPFMBMGA1UdJQQMMAoGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFCEuhH07HvUS3lGiIVyuk6jvW+P1MIGBBggrBgEFBQcBAQR1MHMwJgYIKwYBBQUHMAGGGmh0dHA6Ly9vY3NwLmVzYW50ZS5nb3V2LmZyMEkGCCsGAQUFBzAChj1odHRwOi8vaWdjLXNhbnRlLmVzYW50ZS5nb3V2LmZyL0FDJTIwVEVTVC9BQ0ktRUwtT1JHLVRFU1QuY2VyMFMGA1UdIARMMEowSAYNKoF6AYFVAQcCAQEBATA3MDUGCCsGAQUFBwIBFilodHRwOi8vaWdjLXNhbnRlLmVzYW50ZS5nb3V2LmZyL1BDJTIwVEVTVDCCAVUGA1UdHwSCAUwwggFIMD2gO6A5hjdodHRwOi8vaWdjLXNhbnRlLmVzYW50ZS5nb3V2LmZyL0NSTC9BQ0ktRUwtT1JHLVRFU1QuY3JsMIIBBaCCAQGggf6GgftsZGFwOi8vYW5udWFpcmUtaWdjLmVzYW50ZS5nb3V2LmZyL2NuPVRFU1QlMjBBQyUyMElHQy1TQU5URSUyMEVMRU1FTlRBSVJFJTIwT1JHQU5JU0FUSU9OUyxvdT1URVNUJTIwQUMlMjBSQUNJTkUlMjBJR0MtU0FOVEUlMjBFTEVNRU5UQUlSRSxvdT1JR0MtU0FOVEUlMjBURVNULG91PTAwMDIlMjAxODc1MTI3NTEsbz1BU0lQLVNBTlRFLGM9RlI/Y2VydGlmaWNhdGVyZXZvY2F0aW9ubGlzdDtiaW5hcnk/YmFzZT9vYmplY3RDbGFzcz1wa2lDQTAdBgNVHQ4EFgQUVAFzcrc8l2bK0wdOgL0FX8sLr1wwggEOBgNVHS4EggEFMIIBATCB/qCB+6CB+IaB9WxkYXA6Ly9hbm51YWlyZS1pZ2MuZXNhbnRlLmdvdXYuZnIvY249VEVTVCUyMEFDJTIwSUdDLVNBTlRFJTIwRUxFTUVOVEFJUkUlMjBPUkdBTklTQVRJT05TLG91PVRFU1QlMjBBQyUyMFJBQ0lORSUyMElHQy1TQU5URSUyMEVMRU1FTlRBSVJFLG91PUlHQy1TQU5URSUyMFRFU1Qsb3U9MDAwMiUyMDE4NzUxMjc1MSxvPUFTSVAtU0FOVEUsYz1GUj9kZWx0YXJldm9jYXRpb25saXN0O2JpbmFyeT9iYXNlP29iamVjdENsYXNzPXBraUNBMA4GA1UdDwEB/wQEAwIHgDAPBggqgXoBRwECBQQDBAGDMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggIBADZPQSDWa9SdAxiNvRJWqaN3MAxMJMHrnM9GM6C1kCaeSzncqwQ5XXZbrTD4eLGU6P6IdQcUBRIaUmwyxWMQsx6LbaaJwzcQxz/4BLkblgfGVsz/YP5Q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", 
        dmpAuthenticationPassword = 'Hemadialyse!1', 
        dmpSignatureP12 = "MIIcjgIBAzCCHFQGCSqGSIb3DQEHAaCCHEUEghxBMIIcPTCCFvQGCSqGSIb3DQEHAaCCFuUEghbhMIIW3TCCCMUGCyqGSIb3DQEMCgEDoIIIjTCCCIkGCiqGSIb3DQEJFgGgggh5BIIIdTCCCHEwggZZoAMCAQICEGy8pJ8GtSDZ1HmMxswBkeQwDQYJKoZIhvcNAQELBQAwgYoxCzAJBgNVBAYTAkZSMRMwEQYDVQQKDApBU0lQLVNBTlRFMRcwFQYDVQQLDA4wMDAyIDE4NzUxMjc1MTEXMBUGA1UECwwOSUdDLVNBTlRFIFRFU1QxNDAyBgNVBAMMK1RFU1QgQUMgSUdDLVNBTlRFIEVMRU1FTlRBSVJFIE9SR0FOSVNBVElPTlMwHhcNMjUwNDAzMTUzNTQ2WhcNMjgwNDAzMTUzNTQ2WjBkMQswCQYDVQQGEwJGUjETMBEGA1UECAwKUGFyaXMgKDc1KTEdMBsGA1UECgwUSE9QSVRBTCBERVMgMy4gREFNRVMxEzARBgNVBAsMCjExQjAwNzMxNjAxDDAKBgNVBAMMA0VNQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALLCi4wrrNjQAIM7qLdGG4tnNuX6CVaIEMgRXqSiwEfcg/bwraxs1hd1wLdXooZr0zW/Ck/rFaAkyZk4LmhEZugfv7stW7KVbbdQW2G8+OBaCthakMtQ5qVrGBdanXWdtl1T2SHlJVlhAYy+o3XWUJH/NFLG/hAZ/PFabSZX+AtL6XpRAXY0NDdX/mi24RzaEq3fdllWPSZSF3TSL0vdhNEDZTweJQleeNquwWqo/jsVkmCLMLriKcIozq6BzgUYeUGVUv295zStHb6Q40caK4jX2UcQE7hpZ1XhzUorKBTNLDh1e/DCa5d0Rsuf43EAG+flauGZTWY0+N0g5+x1fGECAwEAAaOCA/YwggPyMBMGA1UdJQQMMAoGCCsGAQUFBwMEMB8GA1UdIwQYMBaAFCEuhH07HvUS3lGiIVyuk6jvW+P1MIGBBggrBgEFBQcBAQR1MHMwJgYIKwYBBQUHMAGGGmh0dHA6Ly9vY3NwLmVzYW50ZS5nb3V2LmZyMEkGCCsGAQUFBzAChj1odHRwOi8vaWdjLXNhbnRlLmVzYW50ZS5nb3V2LmZyL0FDJTIwVEVTVC9BQ0ktRUwtT1JHLVRFU1QuY2VyMFMGA1UdIARMMEowSAYNKoF6AYFVAQcCAQEBATA3MDUGCCsGAQUFBwIBFilodHRwOi8vaWdjLXNhbnRlLmVzYW50ZS5nb3V2LmZyL1BDJTIwVEVTVDArBgNVHRAEJDAigA8yMDI1MDQwMzE1MzU0NlqBDzIwMjgwNDAzMTUzNTQ2WjCCAVUGA1UdHwSCAUwwggFIMD2gO6A5hjdodHRwOi8vaWdjLXNhbnRlLmVzYW50ZS5nb3V2LmZyL0NSTC9BQ0ktRUwtT1JHLVRFU1QuY3JsMIIBBaCCAQGggf6GgftsZGFwOi8vYW5udWFpcmUtaWdjLmVzYW50ZS5nb3V2LmZyL2NuPVRFU1QlMjBBQyUyMElHQy1TQU5URSUyMEVMRU1FTlRBSVJFJTIwT1JHQU5JU0FUSU9OUyxvdT1URVNUJTIwQUMlMjBSQUNJTkUlMjBJR0MtU0FOVEUlMjBFTEVNRU5UQUlSRSxvdT1JR0MtU0FOVEUlMjBURVNULG91PTAwMDIlMjAxODc1MTI3NTEsbz1BU0lQLVNBTlRFLGM9RlI/Y2VydGlmaWNhdGVyZXZvY2F0aW9ubGlzdDtiaW5hcnk/YmFzZT9vYmplY3RDbGFzcz1wa2lDQTAdBgNVHQ4EFgQUqEGD1aEQ+IxgqwwLm7aNOGayxnQwggEOBgNVHS4EggEFMIIBATCB/qCB+6CB+IaB9WxkYXA6Ly9hbm51YWlyZS1pZ2MuZXNhbnRlLmdvdXYuZnIvY249VEVTVCUyMEFDJTIwSUdDLVNBTlRFJTIwRUxFTUVOVEFJUkUlMjBPUkdBTklTQVRJT05TLG91PVRFU1QlMjBBQyUyMFJBQ0lORSUyMElHQy1TQU5URSUyMEVMRU1FTlRBSVJFLG91PUlHQy1TQU5URSUyMFRFU1Qsb3U9MDAwMiUyMDE4NzUxMjc1MSxvPUFTSVAtU0FOVEUsYz1GUj9kZWx0YXJldm9jYXRpb25saXN0O2JpbmFyeT9iYXNlP29iamVjdENsYXNzPXBraUNBMA4GA1UdDwEB/wQEAwIGwDAPBggqgXoBRwECBQQDBAGDMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggIBAFa0mh17v70CFx2uqvf0kyUFMA85ph40Ul5qhNj2Nq5nUt7Hkdev6d0n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", 
        dmpSignaturePassword = 'Hemadialyse!1') {
        return {
            "Content-Type": contentType,
            //"dmpAuthentificationP12.name": "asip-p12-EL-TEST-ORG-AUTH_CLI-20250403-173319.p12",
            "dmpAuthentication.p12": dmpAuthenticationP12,
            "dmpAuthentication.password": dmpAuthenticationPassword,
            //"dmpAuthentificationP12.name": "asip-p12-EL-TEST-ORG-SIGN-20250403-173601.p12",
            "dmpSignature.p12": dmpSignatureP12,
            "dmpSignature.password": dmpSignaturePassword
        };
    }

    createDmpAuthentication(username = '', password = '') {
        return {
            auth: {
                username: "devcoop",
                password: "e5b8e3e2-3c03-4f23-abea-846c464fc2d3"
            }
        };
    }

    createDmpRequestConfig(headers = this.createDmpHeaders(), authentication = this.createDmpAuthentication()) {
        return {
            ...authentication,
            headers: headers
        };
    }

    async td02Exist(author, ins, cle_ins) {
        try {
            console.log("dmp.services.js author = " + author.nom + " " + author.prenom)
            let axiosResponse = await axios.post(
                '/dmp/td02Exist',
                {
                    "context": {
                        "author": {
                           "internalId": "123",
                           "rpps": "899700296140",
                            "nom": "MED-CS RPPS0029614",
                            "prenom": "ANNE",
                            "role": "10",
                            "secteurActivite": "SA05",
                            "specialite": "G15_10/SM26",
                            "service": {
                                "nom": "Service de traumatologie"
                            }
                        }
                       
                    },
                    "request": {
                        "matriculeINS": {
                            "valeur": "287080883795737",
                            "identifiantSysteme": "1.2.250.1.213.1.4.10"
                        }
                    }
                },
                this.createDmpRequestConfig()
            );
            return axiosResponse.data;
        }
        catch (exception) {
            console.log(exception);
            throw new Error('Impossible de vérifier l\'existence du DMP pour ce patient.');
        }
    }

    // TODO: fix this
    async td03AddAuthorization(author, ins, cle_ins) {
        try {
            await axios.put(
                '/dmp/td03AddAuthorization',
                {
                    "context": {
                        "author": {
                            "internalId": author.internalId,
                            "nom": author.nom,
                            "prenom": author.prenom,
                            "role": author.role,
                            "specialite": author.specialite,
                            "secteurActivite": author.secteurActivite,
                            "rpps": author.rpps,
                            "structureSante": {
                                "nom": "DMP",
                                "idNational": "11B0073160"
                            }
                        },
                        "modeAcces": {
                            "acces": "NORMAL"
                        }
                    },
                    "request": {
                        "matriculeINS": {
                                "valeur": "287080883795737",
                                "identifiantSysteme": "1.2.250.1.213.1.4.10"
                        }
                    }
                },
                this.createDmpRequestConfig()
            );
        }
        catch (exception) {
            console.log(exception);
            throw new Error('Impossible d\'accorder une autorisation à ce DMP.');
        }
    }

    async td04ListDMPActifs(author) {
        try {
            const axiosResponse = await axios.put(
                '/dmp/td04ListDMPActifs',  
                {
                    "context": {
                        "author": {
                            "internalId": author.internalId,
                            "nom": author.nom,
                            "prenom": author.prenom,
                            "role": author.role,
                            "specialite": author.specialite,
                            "secteurActivite": author.secteurActivite,
                            "rpps": author.rpps,
                            "structureSante": {
                                "nom": "DMP",
                                "idNational": "10B0212643"
                            }
                        },
                        "modeAcces": {
                            "acces": "NORMAL"
                        }
                    },
                    "request": {
                        "from": "2023-10-01T00:27:44.800Z",
                        "searchType": "LAST_DOC"
                    }
                },
                this.createDmpRequestConfig());

            console.log("td04ListDMPActifs:", axiosResponse.data.patients)
            return axiosResponse.data.patients;
        }
        catch (exception) {
            console.log("Erreur td04ListDMPActifs:", exception)
            throw exception;
        }
    }

    buildPostData(postData, filter) {
        if (filter.documentCategory != null) {
            console.log(filter.documentCategory.id);
            postData.request.classCode = [filter.documentCategory.id];

        }
    }

    getClassCode() {
        const documentCategory = useDmpDocumentsStore().filter.documentCategory;
        if (documentCategory != null) {
            return documentCategory.id;
        }
        return;
    }

    // build a request object with the filter values only if they are not null
    buildRequestObject(filter) {
        const request = {
            query: "FindDocuments",
            statuses: ["APPROVED"],
            matriculeINS: {
                identifiantSysteme: "1.2.250.1.213.1.4.10",
                // v valeur de test, à terme remplacer par l'INS du patient selectionné
                //valeur: "279035121518989",
                valeur: "287080883795737"
            },
        };


        // TODO : loop through all available filters
        if (filter[10] != null) {
            request.classCode = [filter[10].id];
        }
        if (filter[11] != null) {
            request.typeCode = [filter[11].id];
        }

        return request;
    }


    async td31Find() {

        try {
            const postData = {
                context: {
                    author: { structureSante: { idNational: "10B0212643" } },
                    modeAcces: { acces: "NORMAL" },
                },
                request: this.buildRequestObject(useDmpDocumentsStore().filter),
            };

            this.buildPostData(postData, useDmpDocumentsStore().filter);

            const url = "http://127.0.0.1:8080/dmp/td31Find";

            const requestConfig = this.createDmpRequestConfig();

            const response = await axios.post(url, postData, requestConfig);

            console.log("td31Find:", response.data.documents)

            return response.data.documents;
        }
        catch (exception) {
            console.log("Erreur td31Find:", exception)
            // throw exception;
            throw exception.response.data.errorMessage;
        }

    }

    async td32RetrieveContent(index) {
        try {
            const postData = {
                "context": {
                    "author": {

                        "structureSante": {
                            // finess de test, à terme remplacer par la finess de l'établissement de l'utilisateur
                            "idNational": "10B0212643",
                        }
                    },
                    "modeAcces": {
                        "acces": "NORMAL",
                    }
                },
                "request": {
                    // INS de test, à terme remplacer par l'INS du patient selectionné
                    "matriculeINS": {
                        "valeur": "287080883795737",
                        "identifiantSysteme": "1.2.250.1.213.1.4.10"
                    },
                    "document": {
                        "uniqueId": useDmpDocumentsStore().documents[index].uniqueId,
                        "repositoryUniqueId": useDmpDocumentsStore().documents[index].repositoryUniqueId,
                    }
                }
            };

            console.log(postData.request.document.uniqueId)
            console.log(postData.request.document.repositoryUniqueId)

            const url = "http://127.0.0.1:8080/dmp/td32RetrieveContent";

            const requestConfig = this.createDmpRequestConfig();

            let axiosResponse = await axios.post(url, postData, requestConfig);

            console.log("td32RetrieveContent:", axiosResponse.data)

            return axiosResponse.data;
            
        }
        catch (exception) {
            console.log("Erreur td32RetrieveContent:", exception)
            throw exception;
        }
    }

    // TODO
    async td33updateStatus() {
        try {
            await axios.post(
                'dmp/td33updateStatus',
                {
                    "context": {
                        "author": {
                            "internalId": "123",
                            "rpps": "899700296140",
                            "nom": "MED-CS RPPS0029614",
                            "prenom": "ANNE",
                            "role": "10",
                            "secteurActivite": "SA05",
                            "specialite": "G15_10/SM26",
                            "service": {
                                "nom": "Service de traumatologie"
                            },
                            "structureSante": {
                                "nom": "CENTRE DE SANTE RPPS15683",
                                "idNational": "10B0156832"
                            }
                        }
                    },
                    "request": {
                        "matriculeINS": {
                            "valeur": "287080883795737",
                            "identifiantSysteme": "1.2.250.1.213.1.4.10"
                        }
                    }
                },
                this.createDmpRequestConfig()
            );
        }
        catch (exception) {
            console.log("Erreur td33updateStatus:", exception)
            throw exception;
        }
    }

    // TODO
    async td33updateConfidentiality() {
        try {
            await axios.post(
                'dmp/td33updateConfidentiality',
                {
                    "context": {
                        "author": {
                            "adeli": "string",
                            "rpps": "899700296140",
                            "internalId": "string",
                            "nom": "MED-CS RPPS0029614",
                            "prenom": "ANNE",
                            "role": "10",
                            "specialite": "G15_10/SM26",
                            "secteurActivite": "string",
                            "structureSante": {
                                "idNational": "10B0156832",
                                "nom": "CENTRE DE SANTE RPPS15683",
                                "adresse": {
                                    "ligneAdresse": "string",
                                    "complementAdresse": "string",
                                    "codePostal": "string",
                                    "ville": "string",
                                    "pays": "string"
                                },
                                "email": "string"
                            },
                            "service": {
                                "nom": "Service de traumatologie"
                            },
                            "telephone": "string",
                            "email": "string"
                        },
                        "confidentialityCode": {
                            "valeur": "string",
                            "identifiantNomenclature": "string",
                            "libelle": "string"
                        },
                        "modeAcces": {
                            "acces": "NORMAL",
                            "raison": "string"
                        }
                    },
                    "request": {
                        "matriculeINS": {
                            "valeur": "string",
                            "identifiantSysteme": "string"
                        },
                        "documentUuid": "string",
                        "confidentialities": [
                            "string"
                        ],
                        "contentType": "string"
                    }
                },
                this.createDmpRequestConfig()
            )
        }
        catch (exception) {
            console.log("Erreur td33updateStatus:", exception)
            throw exception;
        }
    }

    async dmpNomenclatures(valeur) {
        try {
            const requestConfig = this.createDmpRequestConfig();
            requestConfig.params = {
                jeuxValeurs: valeur
            };
            
            const axiosResponse = await axios.get(
                'http://127.0.0.1:8080/dmp/nomenclatures',
                requestConfig
            );
            return axiosResponse.data;
        }
        catch (exception) {
            console.log(exception);
            throw new Error('Impossible de récupérer les nomenclatures.');
        }
    }

}
