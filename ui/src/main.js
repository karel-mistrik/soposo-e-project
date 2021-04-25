import Vue from 'vue';
import VeeValidate from 'vee-validate'
import cs from 'vee-validate/dist/locale/cs'
import VueI18n from 'vue-i18n';
import router from './router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import mixins from './mixin/mixins';

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'cs',
});

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    cs: {
      messages: cs.messages,
      attributes: { mail: 'Эл.почта' },
    },
  },
});

Vue.config.productionTip = false;
Vue.mixin(mixins)

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
