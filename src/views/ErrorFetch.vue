<template>
    <div class="centered-container">
        <div class="centered-content">
            <v-col>
                <v-row
                    justify="center"
                >
                    <p class="ma-5">{{ message }}</p>
                </v-row>
                <v-row
                    justify="center"
                >
                  <v-btn
                    class="v-btn"
                    outlined
                    color
                    @click="this.$emit('onButtonTapped')"
                >
                    {{ buttonText }}
                </v-btn>  
                </v-row>
            </v-col>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: 'Une erreur est survenue'
        },
        buttonText: {
            type: String,
            default: 'Réessayer'
        }
    },
    emits: ['onButtonTapped'],
    data() {
        return {};
    },
};
</script>

<style>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.centered-content {
    text-align: center;
}
</style>
