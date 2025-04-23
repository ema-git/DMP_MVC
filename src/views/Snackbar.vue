<template>
    <v-snackbar
        v-model="this.isShowing"
        :color="color"
        :timeout="timeout"
        multi-line
    >
    <div class="snackbar-text">
        {{ message }}
    </div>
      <v-btn
        :color="buttonLabelColor"
        @click="hideAndEmitsCallback"
    >
    <div class="snackbar-btn-label">
        {{ buttonLabel }}
    </div>
    </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        buttonLabel: {
            type: String,
            default: "Fermer"
        },
        buttonLabelColor: {
            type: String,
            default:"#ffffff"
        },
        message: String,
        show: Boolean,
        timeout: {
            type: Number,
            default: -1
        },
        color: {
            type: String,
            default: "#8ca9b8"
        },
        messageColor: {
            type: String,
            default: "#ffffff"
        }
    },
    emits: [
        "on-button-tapped"
    ],
    data() {
        return {
            isShowing: this.show
        };
    },
    methods: {
        updateVisibility(visible) {
            this.isShowing = visible;
        },
        hideAndEmitsCallback() {
            this.updateVisibility(false);
            this.$emit('on-button-tapped');
        }
    },
    watch: {
        show: function (newValue, _) {
            this.updateVisibility(newValue);
        }
    }
}
</script>