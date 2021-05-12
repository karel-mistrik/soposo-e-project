/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  hotels: [],
  hotel: {},
  filteredHotels: [],
};

const getters = {
  allHotels: (state) => state.hotels,
  certainHotel: (state) => state.hotel,
  filteredHotels: (state) => state.filteredHotels,
};

const actions = {
  async fetchHotels({ commit, rootState }) {
    const response = await api.get(`/api/hotels?secret_token=${rootState.auth.token}`);
    commit('setHotels', response.data);
    commit('setFilteredHotels', response.data)
  },
  updateHotels({ commit }, hotels) {
    commit('setFilteredHotels', hotels)
  },

  async createHotel({ dispatch, rootState }, hotel) {
    await api.post(`/api/hotels?secret_token=${rootState.auth.token}`, {
      ...hotel,
    });

    await dispatch('fetchHotels');
    return true;
  },
  async deleteHotel({ dispatch, rootState }, hotel) {
    await api.delete(`/api/hotels/${hotel.HotelID}?secret_token=${rootState.auth.token}`);

    await dispatch('fetchHotels');
    return true;
  },
  async setHotel({ commit, dispatch }, id) {
    await dispatch('fetchHotels');
    if (state.hotels.length !== 0) {
      const hotel = state.hotels.filter((hotel) => hotel.HotelID.toString() === id.toString());
      commit('currentHotel', hotel[0]);
      return true
    }
    return false
  },
  async editHotel({ dispatch, rootState }, hotel) {
    await api.put(`/api/hotels/${hotel.hotelId}?secret_token=${rootState.auth.token}`, hotel);
    await dispatch('fetchHotels');
    return true;
  },
};

const mutations = {
  setHotels: (state, hotels) => (state.hotels = hotels),
  currentHotel: (state, hotel) => {
    state.hotel = hotel
  },
  setFilteredHotels: (state, hotels) => (state.filteredHotels = hotels),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
