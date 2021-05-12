/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
import api from '@/api';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const getters = {
  loggedUser: (state) => state.user,
};

const actions = {
  async loginUser({ commit }, user) {
    const response = await api.post('/login', {
      ...user,
    });
    commit('userLogged', response.data);
    return true
  },
};

const mutations = {
  newUser: (state, user) => state.user = user,
  userLogged: (state, data) => {
    state.user = data.user
    state.token = data.token
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
