<script defer>
    export default{
    data() {
    return {
        select: null,
        checkbox: false,
        classeDoc: [
        'Compte-rendu',
        ],
        typeDoc: [
        'CR de bilan fonctionnel (par auxiliaire médical)',
        ],
        filter: '',
        
        stats: [
        'Approuvé',
        'Archivé',
        'Téléchargé',
        ],
    };
    },
    created() {

    },
    methods: {
    validate() {
        this.$refs.formFiltre.validate();
    },
    reset() {
        this.$refs.formFiltre.reset();
    },
    
    },
    };
</script>
<template>
    <div>
        <head>
            <!-- our project just needs Font Awesome Solid + Brands -->
            <!--
            <link href="/your-path-to-fontawesome/css/fontawesome.css" rel="stylesheet">
            <link href="/your-path-to-fontawesome/css/brands.css" rel="stylesheet">
            <link href="/your-path-to-fontawesome/css/solid.css" rel="stylesheet">
            -->
        </head>
            <!--<i class="fa-solid fa-user"></i>-->
            <!-- uses solid style -->
            <!--<i class="fa-brands fa-github-square"></i>-->
            <!-- uses brand style -->

        <!--formulaire filtre-->
        <div id="formFilter">
            <v-row>
                <v-form ref="formFiltre" v-model="filter">
                    <h3><v-icon>mdi-filter</v-icon>Paramètres des filtres</h3>
                    <div class="Visibility">    
                        <h4>Visibilité</h4>
                        <!--les différentes options des cases à cocher-->
                        <v-checkbox hide-details v-model="checkbox">
                            <template v-slot:label >
                                <v-icon style="color:green;">mdi-account</v-icon>
                                <span style="color:green;">Non visible par les patients</span>
                            </template>
                        </v-checkbox>
                        <v-checkbox hide-details>
                            <template v-slot:label>
                                <v-icon style="color: #d22d55;">mdi-plus-box</v-icon>
                                <span style="color: #d22d55;">Masqué aux professionels de santé</span>
                            </template>
                        </v-checkbox>
                        <v-checkbox hide-details>
                            <template v-slot:label>
                                <v-icon style="color: rgb(20,110,190);">mdi-human-male-female</v-icon>
                                <span style="color: rgb(20,110,190);">Non visible pour les représentants légaux</span>
                            </template>
                        </v-checkbox>
                        <h4>Mes documents transférés</h4>
                        <v-checkbox  label="Afficher uniquement mes documents"></v-checkbox>
                    </div>
                    <v-col cols="24" vsm="12" md="6">
                        <v-select solo :items="stats" label="Statut du document"></v-select>
                    </v-col> 
                    <v-row>
                        <v-col cols="12" vsm="6" md="3">
                            <v-text-field solo label="Soumission du" type=date></v-text-field>
                        </v-col>
                        <v-col cols="6" vsm="3" md="3">
                        <v-text-field solo type=time></v-text-field>
                        </v-col>
                        <v-col cols="12" vsm="6" md="3">
                            <v-text-field solo label="au" type=date></v-text-field>
                        </v-col>
                        <v-col cols="6" vsm="3" md="3">
                        <v-text-field solo type=time></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="24" vsm="12" md="6">
                            <v-select solo :items="classeDoc" label="Catégorie du document"></v-select>
                        </v-col>
                        <v-col cols="24" vsm="12" md="6">
                            <v-select solo :items="typeDoc" label="Type du document"></v-select>
                        </v-col>
                    </v-row> 
                    <v-divider></v-divider>
                    <div class="Acte">
                        <v-row justify="center">
                            <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title>Début et fin de l'acte</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        
                                        <v-row>
                                        <v-col cols="12" vsm="6" md="3">
                                                <v-text-field solo label= "Début de l'acte du" type=date></v-text-field>
                                            </v-col>
                                            <v-col cols="3" vsm="3" md="3">
                                                <v-text-field solo type=time></v-text-field>
                                            </v-col>
                                            <v-col cols="12" vsm="6" md="3">
                                                <v-text-field solo label= "au" type=date></v-text-field>
                                            </v-col>
                                            <v-col cols="3" vsm="3" md="3">
                                                <v-text-field solo type=time></v-text-field>
                                            </v-col>
                                        </v-row>
                                        
                                        <v-row>
                                            <v-col cols="12" vsm="6" md="3">
                                                <v-text-field outlined label= "Fin  de l'acte du" type=date></v-text-field>
                                            </v-col>
                                            <v-col cols="12" vsm="6" md="3">
                                                <v-text-field solo type=time></v-text-field>
                                            </v-col>
                                            <v-col cols="12" vsm="6" md="3">
                                                <v-text-field solo label= "au" type=date></v-text-field>
                                            </v-col>
                                            <v-col cols="12" vsm="6" md="3">
                                                <v-text-field solo type=time></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-row>
                    </div>
                    <v-row>
                        <v-col>
                            <v-btn rounded class="reinitFilter" color= #d22d55 @click="reset">
                                <v-icon style="color: white;">mdi-close</v-icon> 
                                <span style="color: white;">Réinitialiser les filtres</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn rounded class="applyFilter" color= rgb(20,110,190) @click="validate">
                                <v-icon style="color: white;">mdi-check</v-icon> 
                                <span style="color: white;">Appliquer les filtres</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-row>
        </div>
    </div>
        
</template>

<style scoped>

h3{
    color:#24a1b6;
}
/*#formFilter{

}*/
.reinitFilter{ 
    font-size: 12px;
    height :32px; 
    margin-top: 25px;
    text-align: center;
    text-shadow: 1px 1px 1px #000;
    border-radius: 20px; 
    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6); 
    width:250px;
        /* line-height: 2.5;
       padding: 0 20px;
        color: #fff;
        text-transform: initial;
        margin-left: 65px;*/
}
      .applyFilter{
    /*line-height: 2.5;
        padding: 0 20px;
        color: #fff;
        text-transform: initial;
        margin-bottom:20px;
        margin-left: 65px;
        */
        font-size: 12px;
        height :32px;
        margin-top: 25px;
        text-align: center;
        text-shadow: 1px 1px 1px #000;
        border-radius: 20px; 
        box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6);
        width:250px;
      }
      /*changement de visuel du filtre*/
      /*div.Visibility{
        float: right;
      }

      div.Acte{
        float : left;
        width: 70%;
      }*/
</style>
