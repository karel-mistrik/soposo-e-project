import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#9e6a47',
        secondary: '#212121',
        accent: '#db854b',
        error: '#f5454c',
      },
    },
  },
});
