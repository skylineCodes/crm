import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    clientModal: null,
    modalActive: null,
    clientData: [],
    clientsLoaded: null,
    currentClientArray: null,
    editClient: null,
  },
  mutations: {
    TOGGLE_CLIENT(state) {
      state.clientModal = !state.clientModal;
    },

    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },

    SET_CLIENT_DATA(state, payload) {
      state.clientData.push(payload);
    },

    CLIENTS_LOADED(state) {
      state.clientsLoaded = true;
    },

    SET_CURRENT_CLIENT(state, payload) {
      state.currentClientArray = state.clientData.filter((client) => {
        return client.id === Number(payload);
      });
    },
    TOGGLE_EDIT_CLIENT(state) {
      state.editClient = !state.editClient;
    },
    DELETE_CLIENT(state, payload) {
      state.clientData = state.clientData.filter((client) => {
        client.id !== Number(payload);
      });
    },
  },
  actions: {
    async GET_CLIENTS({ commit, state }) {
      const { data } = await axios.get(`http://localhost:8001/api/clients`);
      // console.log(data.data)
      data.data.forEach((client) => {
        if (!state.clientData.some((item) => item.id === client.id)) {
          const response = {
            id: client.id,
            first_name: client.first_name,
            last_name: client.last_name,
            email: client.email,
            primary_legal_counsel: client.primary_legal_counsel,
            date_of_birth: client.date_of_birth,
            case_details: client.case_details,
            profile_image: client.profile_image,
            date_profiled: client.date_profiled,
          };

          commit('SET_CLIENT_DATA', response);
        }
      });
      commit('CLIENTS_LOADED');
    },
    async UPDATE_CLIENT({ commit, dispatch }, { id, routeId }) {
      commit('DELETE_CLIENT', id);
      await dispatch('GET_CLIENTS');
      commit('TOGGLE_CLIENT');
      commit('TOGGLE_EDIT_CLIENT');
      commit('SET_CURRENT_CLIENT', routeId);
    },
    async DELETE_CLIENT({ commit, dispatch }, id) {
      commit('DELETE_CLIENT', id);
      await dispatch('GET_CLIENTS');
    },
  },
  modules: {},
});
