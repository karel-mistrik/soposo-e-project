/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  reviews: [],
};

const getters = {
  getReviews: (state) => state.reviews,
};

const actions = {
  async fetchReviews({ commit, rootState }, id) {
    const response = await api.get(`/api/hotels/${id}/reviews?secret_token=${rootState.auth.token}`);
    commit('setReviews', response.data);
  },
  async createReview({ dispatch, rootState }, review) {
    await api.post(`/api/hotels/reviews?secret_token=${rootState.auth.token}`, review);
    dispatch('fetchReviews', review.hotelId)
  },
  async deleteReview({ dispatch, rootState }, reviewId) {
    await api.delete(`/api/hotels/reviews/${reviewId}?secret_token=${rootState.auth.token}`);
    dispatch('fetchReviews', rootState.hotels.hotel.HotelID)
  },
};

const mutations = {
  setReviews: (state, reviews) => (state.reviews = reviews),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
