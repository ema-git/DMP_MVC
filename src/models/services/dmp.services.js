import axios from 'axios';
import axiosResponse from 'axios';
import { useDmpDocumentsStore } from '../stores/dmpDocumentsStore';

export class DmpServices {

    constructor() { }

    createDmpHeaders(contentType = "application/json", 
        dmpAuthenticationP12 = "MIIcbgIBAzCCHDQGCSqGSIb3DQEHAaCCHCUEghwhMIIcHTCCFtQGCSqGSIb3DQEHAaCCFsUEghbBMIIWvTCCCKUGCyqGSIb3DQEMCgEDoIIIbTCCCGkGCiqGSIb3DQEJFgGggghZBIIIVTCCCFEwggY5oAMCAQICEFDy7F5f9TznpoQ2MzlLGp4wDQYJKoZIhvcNAQELBQAwgYoxCzAJBgNVBAYTAkZSMRMwEQYDVQQKDApBU0lQLVNBTlRFMRcwFQYDVQQLDA4wMDAyIDE4NzUxMjc1MTEXMBUGA1UECwwOSUdDLVNBTlRFIFRFU1QxNDAyBgNVBAMMK1RFU1QgQUMgSUdDLVNBTlRFIEVMRU1FTlRBSVJFIE9SR0FOSVNBVElPTlMwHhcNMjMwOTE4MTM1MDM2WhcNMjYwOTE4MTM1MDM2WjBxMQswCQYDVQQGEwJGUjETMBEGA1UECAwKUGFyaXMgKDc1KTEdMBsGA1UECgwUSE9QSVRBTCBERVMgMy4gREFNRVMxEzARBgNVBAsMCjExQjAwNjI2NDAxGTAXBgNVBAMMEGRldmJveC1zYW50ZSBkbXAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7dtxjw9vl92Gg6K1SdHiR9k/OVcbqnVbutMZSKRlUk+RV1581kaeiA3xMvfYu9rEcoSp4tynlwG9v5Sf9STDj2btq+84e+MkarHPIQO79w5Fos2/WoY1wXBQti2aQgSQRcWXVPB2DvwS/K8h+SlSBcnFscLgT5RYNRc42Gqvtb/Ko3jK65L6uxudxw5BkKnAVUKp7rIZ4Yk6JS/dI3KLeSIEVf7334o1iADOC7MVIMFhYHF+MmF0ueMxcnLXMmQvAA+S0gUn2g2wP8vZgClJzlvTcXwddAjb9wFvxK8lAz5x5jn8tVgzKzRKMJu1Yky5AIGDKC7a9jqQCHMTjyPMxAgMBAAGjggPJMIIDxTATBgNVHSUEDDAKBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQhLoR9Ox71Et5RoiFcrpOo71vj9TCBgQYIKwYBBQUHAQEEdTBzMCYGCCsGAQUFBzABhhpodHRwOi8vb2NzcC5lc2FudGUuZ291di5mcjBJBggrBgEFBQcwAoY9aHR0cDovL2lnYy1zYW50ZS5lc2FudGUuZ291di5mci9BQyUyMFRFU1QvQUNJLUVMLU9SRy1URVNULmNlcjBTBgNVHSAETDBKMEgGDSqBegGBVQEHAgEBAQEwNzA1BggrBgEFBQcCARYpaHR0cDovL2lnYy1zYW50ZS5lc2FudGUuZ291di5mci9QQyUyMFRFU1QwggFVBgNVHR8EggFMMIIBSDA9oDugOYY3aHR0cDovL2lnYy1zYW50ZS5lc2FudGUuZ291di5mci9DUkwvQUNJLUVMLU9SRy1URVNULmNybDCCAQWgggEBoIH+hoH7bGRhcDovL2FubnVhaXJlLWlnYy5lc2FudGUuZ291di5mci9jbj1URVNUJTIwQUMlMjBJR0MtU0FOVEUlMjBFTEVNRU5UQUlSRSUyME9SR0FOSVNBVElPTlMsb3U9VEVTVCUyMEFDJTIwUkFDSU5FJTIwSUdDLVNBTlRFJTIwRUxFTUVOVEFJUkUsb3U9SUdDLVNBTlRFJTIwVEVTVCxvdT0wMDAyJTIwMTg3NTEyNzUxLG89QVNJUC1TQU5URSxjPUZSP2NlcnRpZmljYXRlcmV2b2NhdGlvbmxpc3Q7YmluYXJ5P2Jhc2U/b2JqZWN0Q2xhc3M9cGtpQ0EwHQYDVR0OBBYEFC6J97rc8yM/ulj+7kezle62HEY6MIIBDgYDVR0uBIIBBTCCAQEwgf6ggfuggfiGgfVsZGFwOi8vYW5udWFpcmUtaWdjLmVzYW50ZS5nb3V2LmZyL2NuPVRFU1QlMjBBQyUyMElHQy1TQU5URSUyMEVMRU1FTlRBSVJFJTIwT1JHQU5JU0FUSU9OUyxvdT1URVNUJTIwQUMlMjBSQUNJTkUlMjBJR0MtU0FOVEUlMjBFTEVNRU5UQUlSRSxvdT1JR0MtU0FOVEUlMjBURVNULG91PTAwMDIlMjAxODc1MTI3NTEsbz1BU0lQLVNBTlRFLGM9RlI/ZGVsdGFyZXZvY2F0aW9ubGlzdDtiaW5hcnk/YmFzZT9vYmplY3RDbGFzcz1wa2lDQTAOBgNVHQ8BAf8EBAMCB4AwDwYIKoF6AUcBAgUEAwQBgzAJBgNVHRMEAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQAll21eKQ40HxU9EeEOzEKSnaf+fJcfXhVMhisUhyNBlLhXE3MsrnncdHyznZHxbTb7OxqNcYhhl1UUmAPFT3Q2UBkOtqMEcD/n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", 
        dmpAuthenticationPassword = 'Gblancheneige!111222', 
        dmpSignatureP12 = "MIIcmwIBAzCCHGEGCSqGSIb3DQEHAaCCHFIEghxOMIIcSjCCFwEGCSqGSIb3DQEHAaCCFvIEghbuMIIW6jCCCNIGCyqGSIb3DQEMCgEDoIIImjCCCJYGCiqGSIb3DQEJFgGgggiGBIIIgjCCCH4wggZmoAMCAQICEElee6zfxtC+6N1VIkqpemwwDQYJKoZIhvcNAQELBQAwgYoxCzAJBgNVBAYTAkZSMRMwEQYDVQQKDApBU0lQLVNBTlRFMRcwFQYDVQQLDA4wMDAyIDE4NzUxMjc1MTEXMBUGA1UECwwOSUdDLVNBTlRFIFRFU1QxNDAyBgNVBAMMK1RFU1QgQUMgSUdDLVNBTlRFIEVMRU1FTlRBSVJFIE9SR0FOSVNBVElPTlMwHhcNMjMwOTE4MTM1MTQ1WhcNMjYwOTE4MTM1MTQ1WjBxMQswCQYDVQQGEwJGUjETMBEGA1UECAwKUGFyaXMgKDc1KTEdMBsGA1UECgwUSE9QSVRBTCBERVMgMy4gREFNRVMxEzARBgNVBAsMCjExQjAwNjI2NDAxGTAXBgNVBAMMEGRldmJveC1zYW50ZSBkbXAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCAlu7edBDntF0lb18GdmW9bUsTMBNOq6PtTI0srSc/NwOGEaPsdYBON79sv/QQGU7dmLIeDj3ael15x1tACsCPFP9Y307XV8g4JFzHqIy+EEKXpgKxhBEUNQnXiWFogZJb/hWKN1xLfyJryEAPjDSG0nPiI9k+ybX72zAuJ0YkdjFvhV9eObjWnrepiAxRfmoqfFu7Rd2WtGq2YT0tkE0lkK2P6Z5+EXb7sC2T1QJiFzzVtnHWaSVZLLTfdnNwv5Z0tiVlWM0YFQJ7tdVlNrcahaa3sE1t7jjCDy/EL/PTMYfun6Yr4wzWNwCmyAuc5SWrh4HwZjPPOf13aJ0oLiEHAgMBAAGjggP2MIID8jATBgNVHSUEDDAKBggrBgEFBQcDBDAfBgNVHSMEGDAWgBQhLoR9Ox71Et5RoiFcrpOo71vj9TCBgQYIKwYBBQUHAQEEdTBzMCYGCCsGAQUFBzABhhpodHRwOi8vb2NzcC5lc2FudGUuZ291di5mcjBJBggrBgEFBQcwAoY9aHR0cDovL2lnYy1zYW50ZS5lc2FudGUuZ291di5mci9BQyUyMFRFU1QvQUNJLUVMLU9SRy1URVNULmNlcjBTBgNVHSAETDBKMEgGDSqBegGBVQEHAgEBAQEwNzA1BggrBgEFBQcCARYpaHR0cDovL2lnYy1zYW50ZS5lc2FudGUuZ291di5mci9QQyUyMFRFU1QwKwYDVR0QBCQwIoAPMjAyMzA5MTgxMzUxNDVagQ8yMDI2MDkxODEzNTE0NVowggFVBgNVHR8EggFMMIIBSDA9oDugOYY3aHR0cDovL2lnYy1zYW50ZS5lc2FudGUuZ291di5mci9DUkwvQUNJLUVMLU9SRy1URVNULmNybDCCAQWgggEBoIH+hoH7bGRhcDovL2FubnVhaXJlLWlnYy5lc2FudGUuZ291di5mci9jbj1URVNUJTIwQUMlMjBJR0MtU0FOVEUlMjBFTEVNRU5UQUlSRSUyME9SR0FOSVNBVElPTlMsb3U9VEVTVCUyMEFDJTIwUkFDSU5FJTIwSUdDLVNBTlRFJTIwRUxFTUVOVEFJUkUsb3U9SUdDLVNBTlRFJTIwVEVTVCxvdT0wMDAyJTIwMTg3NTEyNzUxLG89QVNJUC1TQU5URSxjPUZSP2NlcnRpZmljYXRlcmV2b2NhdGlvbmxpc3Q7YmluYXJ5P2Jhc2U/b2JqZWN0Q2xhc3M9cGtpQ0EwHQYDVR0OBBYEFA4sR/TMJEPYistrSNw/z2eQhF7eMIIBDgYDVR0uBIIBBTCCAQEwgf6ggfuggfiGgfVsZGFwOi8vYW5udWFpcmUtaWdjLmVzYW50ZS5nb3V2LmZyL2NuPVRFU1QlMjBBQyUyMElHQy1TQU5URSUyMEVMRU1FTlRBSVJFJTIwT1JHQU5JU0FUSU9OUyxvdT1URVNUJTIwQUMlMjBSQUNJTkUlMjBJR0MtU0FOVEUlMjBFTEVNRU5UQUlSRSxvdT1JR0MtU0FOVEUlMjBURVNULG91PTAwMDIlMjAxODc1MTI3NTEsbz1BU0lQLVNBTlRFLGM9RlI/ZGVsdGFyZXZvY2F0aW9ubGlzdDtiaW5hcnk/YmFzZT9vYmplY3RDbGFzcz1wa2lDQTAOBgNVHQ8BAf8EBAMCBsAwDwYIKoF6AUcBAgUEAwQBgzAJBgNVHRMEAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQBd6Tv95Ng9fdCb1GASrtS8ThGAlbGFSbqsDig2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", 
        dmpSignaturePassword = 'Gblancheneige!111222') {
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
                                "idNational": "10B0182382"
                            }
                        },
                        "authentificationIndirecteRenforcee" : true,
                        "samlAuthnContext" : "urn:oasis:names:tc:SAML:2.0:ac:classes:MobileTwoFactorUnregistered",
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
                                "idNational": "10B0182382"
                            }
                        },
                        "authentificationIndirecteRenforcee" : true,
                        "samlAuthnContext" : "urn:oasis:names:tc:SAML:2.0:ac:classes:MobileTwoFactorUnregistered",
                        "modeAcces": {
                            "acces": "NORMAL"
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


    async td31Find(query, ins) {
        try {
            const postData = {
              "context": {
                "author" : {
                "rpps" : "899700433156",
                "nom" : "MEDECIN RPPS0043315",
                "prenom" : "VIRGINIE",
                "role" : "10",
                "specialite" : "G15_10/SM26",
                "secteurActivite" : "SA07",
                "service" : {
                  "nom" : "Service pédiatrie"
                },
                "structureSante": {
                   "idNational": "10B0182382"   
                }
              },
              "authentificationIndirecteRenforcee" : true,
              "samlAuthnContext" : "urn:oasis:names:tc:SAML:2.0:ac:classes:Password"
            
              },
              "request": {
                "query": "FindDocuments",
                "matriculeINS": {
                  "valeur": ins,
                  "identifiantSysteme": "1.2.250.1.213.1.4.10"
                },
                "statuses": [
                  "APPROVED"
                ],
                "typeCode": [
                  "15507-7"
                ]
              }
            };

            const url = "/dmp/td31Find";
            const requestConfig = this.createDmpRequestConfig();
            
            console.log("Sending td31Find request:", postData);
            const response = await axios.post(url, postData, requestConfig);
            
            console.log("td31Find response:", response.data);
            return response.data.documents || [];
        }
        catch (exception) {
            console.error("Erreur td31Find:", exception);
            if (exception.response && exception.response.data && exception.response.data.errorMessage) {
                throw exception.response.data.errorMessage;
            } else {
                throw new Error('Erreur lors de la recherche de documents');
            }
        }
    }

    async td32RetrieveContent(document, ins) {
        try {
            const postData = {
                "context": {
                    "author": {
                        "rpps": "899700433156",
                        "nom": "MEDECIN RPPS0043315",
                        "prenom": "VIRGINIE",
                        "role": "10",
                        "specialite": "G15_10/SM26",
                        "secteurActivite": "SA07",
                        "service": {
                            "nom": "Service pédiatrie"
                        },
                        "structureSante": {
                            "idNational": "10B0182382"   
                        }
                    },
                    "authentificationIndirecteRenforcee": true,
                    "samlAuthnContext": "urn:oasis:names:tc:SAML:2.0:ac:classes:Password",
                    "modeAcces": {
                        "acces": "NORMAL"
                    }
                },
                "request": {
                    "matriculeINS": {
                        "valeur": ins,
                        "identifiantSysteme": "1.2.250.1.213.1.4.10"
                    },
                    "document": {
                        "uniqueId": document.uniqueId,
                        "repositoryUniqueId": document.repositoryUniqueId,
                    }
                }
            };

            console.log("Sending td32RetrieveContent request for document:", document.title);
            console.log("Document uniqueId:", document.uniqueId);
            console.log("Document repositoryUniqueId:", document.repositoryUniqueId);

            const url = "/dmp/td32RetrieveContent";
            const requestConfig = this.createDmpRequestConfig();

            const response = await axios.post(url, postData, requestConfig);
            
            console.log("td32RetrieveContent response received");
            return response.data;
        }
        catch (exception) {
            console.error("Erreur td32RetrieveContent:", exception);
            if (exception.response && exception.response.data && exception.response.data.errorMessage) {
                throw exception.response.data.errorMessage;
            } else {
                throw new Error('Erreur lors de la récupération du contenu du document');
            }
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
