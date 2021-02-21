import axios from '@/config/axios';

export default {
  namespaced: true,

  state: {
    user: {},
    users: [],
  },

  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
  },

  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
  },

  actions: {
    fetchUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/users`)
          .then((response) => {
            const { data } = response;

            commit('SET_USERS', data.data);

            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    create({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/users`, payload)
          .then((response) => {
            const { data } = response;

            commit('SET_USER', data.data);

            commit('SET_NOTIFICATION', { messages: { create: data.message }, type: 'success' }, { root: true });

            dispatch('fetchUsers');

            resolve(data);
          })
          .catch((error) => {
            commit('SET_NOTIFICATION', { messages: error.response.data, type: 'danger' }, { root: true });
            reject({ message: error.response.data, type: 'danger' });
          });
      });
    },
    update({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(`users/${payload.uuid}`, payload)
          .then((response) => {
            const { data } = response;

            commit('SET_USER', data.data);

            commit('SET_NOTIFICATION', { messages: { update: data.message }, type: 'primary' }, { root: true });

            resolve(data);
          })
          .catch((error) => {
            commit('SET_NOTIFICATION', { messages: error.response.data, type: 'danger' }, { root: true });
            reject({ message: error.response.data, type: 'danger' });
          });
      });
    },
    softDelete({ commit, dispatch }, uuid) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/users/${uuid}`)
          .then((response) => {
            const { data } = response;

            dispatch('fetchUsers');

            resolve(data);
          })
          .catch((error) => {
            reject({ message: error.response.data, type: 'danger' });
          });
      });
    },
  },
};
