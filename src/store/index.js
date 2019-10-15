import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    error: null,
    info: {}
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");
        const info = (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once("value")).val();

        commit("setInfo", info);
      } catch (e) {
        throw new Error(e);
      }
    },
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      const currency = await res.json();
      return currency;
    }
  },
  getters: {
    getError: state => state.error,
    getInfo: state => state.info
  }
});
