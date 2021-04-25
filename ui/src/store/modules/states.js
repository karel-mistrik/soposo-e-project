/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  hotels: [],
  hotel: {},
  user: null,
  users: [],
  rooms: [],
  room: {},
  filteredHotels: [],
  reservation: {},
  reviews: [],
};

const getters = {
  loggedUser: (state) => state.user,
  allHotels: (state) => state.hotels,
  certainHotel: (state) => state.hotel,
  certainRoom: (state) => state.room,
  allRooms: (state) => state.rooms,
  filteredHotels: (state) => state.filteredHotels,
  getReservation: (state) => state.reservation,
  allUsers: (state) => state.users,
  getReviews: (state) => state.reviews,
};

const actions = {
  async fetchHotels({ commit }) {
    const response = await api.get('/api/hotels');
    commit('setHotels', response.data);
    commit('setFilteredHotels', response.data)
  },
  updateHotels({ commit }, hotels) {
    commit('setFilteredHotels', hotels)
  },
  async fetchReservations() {
    const response = await api.get('/api/reservation');
    return response.data
  },
  async registerUser({ commit }, user) {
    const response = await api.post('/register', {
      ...user,
    });
    commit('newUser', response.data);
    return true;
  },
  async loginUser({ commit }, user) {
    const response = await api.post('/login', {
      ...user,
    });
    commit('currentUser', response.data);
    return true;
  },
  async createHotel({ dispatch }, hotel) {
    await api.post('/api/hotels/', {
      ...hotel,
    });

    await dispatch('fetchHotels');
    return true;
  },
  async deleteHotel({ dispatch }, hotel) {
    await api.delete(`/api/hotels/${hotel.HotelID}`);

    await dispatch('fetchHotels');
    return true;
  },
  setHotel({ commit }, id) {
    const hotel = state.hotels.filter((hotel) => hotel.HotelID === id);
    commit('currentHotel', hotel[0]);
    return true
  },
  // eslint-disable-next-line no-unused-vars
  async getServices({ commit }, hotelID) {
    // eslint-disable-next-line no-return-await
    const response = await api.get(`/api/services/hotel/${hotelID}`);
    return response.data;
  },
  async editHotel({ dispatch }, hotel) {
    // console.log(`/api/hotels/${hotel.HotelID}`);
    await api.put(`/api/hotels/${hotel.HotelID}`, hotel);

    await dispatch('fetchHotels');
    return true;
  },
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
  async createReservation({ commit }, reservation) {
    const response = await api.post('/api/reservation/', reservation);
    commit('setReservation', response.data);
  },
  async finishReservation({ commit }, newStatus) {
    await api.put(`/api/reservation/${state.reservation.id}`, newStatus);
    commit('setReservation', { ...state.reservation, status: newStatus })
  },
  async fetchUsers({ commit }) {
    const response = await api.get('/api/customers/');
    commit('setUsers', response.data);
  },
  async fetchReviews({ commit }, id) {
    const response = await api.get(`/api/hotels/${id}/reviews/`);
    commit('setReviews', response.data);
  },
  async createReview({ dispatch }, review) {
    await api.post('/api/hotels/reviews/', review);
    dispatch('fetchReviews', review.hotelId)
  },
  async deleteReview({ dispatch }, reviewId) {
    await api.delete(`/api/hotels/reviews/${reviewId}`);
    dispatch('fetchReviews', state.hotel.HotelID)
  },
};

const mutations = {
  setHotels: (state, hotels) => (state.hotels = hotels),
  newUser: (state, user) => state.user = user,
  currentUser: (state, user) => (state.user = user),
  currentHotel: (state, hotel) => {
    state.hotel = hotel
  },
  setRooms: (state, rooms) => (state.rooms = rooms),
  currentRoom: (state, room) => (state.room = room),
  setFilteredHotels: (state, hotels) => (state.filteredHotels = hotels),
  setReservation: (state, reservation) => (state.reservation = reservation),
  setUsers: (state, users) => (state.users = users),
  setReviews: (state, reviews) => (state.reviews = reviews),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
