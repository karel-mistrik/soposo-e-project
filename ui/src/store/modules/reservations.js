/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  reservation: {},
};

const getters = {
  getReservation: (state) => state.reservation,
};

const actions = {
  async fetchReservations() {
    const response = await api.get('/api/reservation');
    return response.data
  },

  // eslint-disable-next-line no-unused-vars
  async getServices({ commit }, hotelID) {
    // eslint-disable-next-line no-return-await
    const response = await api.get(`/api/services/hotel/${hotelID}`);
    return response.data;
  },

  async createReservation({ commit }, reservation) {
    const response = await api.post('/api/reservation/', reservation);
    commit('setReservation', response.data);
  },
  async finishReservation({ commit }, newStatus) {
    await api.put(`/api/reservation/${state.reservation.id}`, newStatus);
    commit('setReservation', { ...state.reservation, status: newStatus })
  },

};

const mutations = {
  setReservation: (state, reservation) => (state.reservation = reservation),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
