/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  users: [],
  specificUser: {},
};

const getters = {
  loggedUser: (state) => state.user,
  getAllUsers: (state) => state.users,
  getSpecificUser: (state) => state.specificUser,
};

const actions = {
  async loginUser({ commit }, user) {
    const response = await api.post('/login', {
      ...user,
    });
    commit('userLogged', response.data);
    return true
  },
  async fetchUsers({ commit, rootState }) {
    const response = await api.get(`/api/customers?secret_token=${rootState.auth.token}`);
    commit('setAllUsers', response.data);
  },
  setUser({ commit }, id) {
    const user = state.users.filter((user) => user.CustomerID.toString() === id.toString());
    commit('setSpecificUser', user[0]);
  },
};

const mutations = {
  newUser: (state, user) => state.user = user,
  setAllUsers: (state, users) => (state.users = users),
  userLogged: (state, data) => {
    state.user = data.user
    state.token = data.token
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  },
  setSpecificUser: (state, user) => state.specificUser = user,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
