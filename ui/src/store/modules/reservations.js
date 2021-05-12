/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  reservation: {},
  reservations: [],
};

const getters = {
  getReservation: (state) => state.reservation,
  getReservations: (state) => state.reservations,
}

const actions = {
  async fetchReservations({ commit }) {
    const response = await api.get('/api/reservation');
    commit('setReservations', response.data);
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

  async fetchReservationsByUser({ commit }, user) {
    console.log(user)
    const response = await api.get(`/api/reservation/user/${user.CustomerID}`);
    commit('setReservations', response.data);
  },

  setReservationDetail({ commit }, reservation) {
    commit('setReservation', reservation);
  },
};

const mutations = {
  setReservation: (state, reservation) => (state.reservation = reservation),
  setReservations: (state, reservations) => (state.reservations = reservations),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
