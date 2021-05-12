/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const actions = {
  // eslint-disable-next-line no-unused-vars
  async getServices({ commit }, hotelID) {
    // eslint-disable-next-line no-return-await
    const response = await api.get(`/api/services/hotel/${hotelID}`);
    return response.data;
  },

};
export default {
  actions,
};
