import Vuex from 'vuex';
import Vue from 'vue';
import snackbar from '@/store/modules/snackbar';
import states from './modules/states';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    states,
    snackbar,
  },
});
