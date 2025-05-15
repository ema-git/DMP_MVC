import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import router from './router';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { theme } from './theme/theme.js';


const vuetify = createVuetify({
  components,
  directives,
  theme: theme,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  }
})

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
