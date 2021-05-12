/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  rooms: [],
  room: {},
  selectedRooms: [],
};

const getters = {
  certainRoom: (state) => state.room,
  allRooms: (state) => state.rooms,
  selectedRooms: (state) => state.selectedRooms,
};

const actions = {
  async fetchRooms({ commit }) {
    const response = await api.get('/api/rooms');
    commit('setRooms', response.data);
    return response.data;
  },
  setRoom({ commit }, id) {
    const room = state.rooms.filter((room) => room.RoomID === id);
    commit('currentRoom', room[0]);
    return true;
  },
  fetchRoomsByHotelId({ commit }, id) {
    const hotelRooms = state.rooms.filter((room) => room.HotelID === id);
    commit('selectedRooms', hotelRooms);
    return true;
  },
  async deleteRoomByHotel({ dispatch }, room) {
    await api.delete(`/api/rooms/${room.RoomID}`);
    await dispatch('fetchRooms');
    dispatch('fetchRoomsByHotelId', room.HotelID);
  },
};

const mutations = {
  setRooms: (state, rooms) => (state.rooms = rooms),
  selectedRooms: (state, rooms) => (state.selectedRooms = rooms),
  currentRoom: (state, room) => (state.room = room),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
