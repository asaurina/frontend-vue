import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users/index';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    users,
  },
  state: {
    notification: {
      messages: {},
      type: 'primary',
    },
  },
  getters: {
    getNotification: (state) => state.notification,
  },
  mutations: {
    SET_NOTIFICATION: (state, payload) => {
      state.notification = payload;
    },
    CLEAR_NOTIFICATION: (state) => {
      state.notification = {};
    },
  },
  actions: {
    setNotification({ commit }, payload) {
      commit('SET_NOTIFICATION', payload);
    },
  },
});
