/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  rooms: [],
  room: {},
};

const getters = {
  certainRoom: (state) => state.room,
  allRooms: (state) => state.rooms,
};

const actions = {
  async fetchRooms({ commit }) {
    const response = await api.get('/api/rooms');
    commit('setRooms', response.data);
    // console.log(`rooms${state.rooms}`);
    return response.data;
  },
  setRoom({ commit }, id) {
    const room = state.rooms.filter((room) => room.RoomID === id);
    commit('currentRoom', room[0]);
    return true;
  },
  fetchRoomsByHotelId({ commit }, id) {
    const hotelRooms = state.rooms.filter((room) => room.HotelID === id);
    commit('setRooms', hotelRooms);
    return true;
  },
  async deleteRoomByHotel({ dispatch }, roomId) {
    await api.delete(`/api/rooms/${roomId}`);
    dispatch('fetchRoomsByHotelId', state.hotel.HotelID)
  },
};

const mutations = {
  setRooms: (state, rooms) => (state.rooms = rooms),
  currentRoom: (state, room) => (state.room = room),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
