import Vuex from 'vuex';
import Vue from 'vue';
import snackbar from '@/store/modules/snackbar';
import services from './modules/services';
import auth from './modules/auth';
import hotels from './modules/hotels';
import reviews from './modules/reviews';
import rooms from './modules/rooms';
import reservations from './modules/reservations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    services,
    snackbar,
    auth,
    hotels,
    reviews,
    rooms,
    reservations,
  },
});
