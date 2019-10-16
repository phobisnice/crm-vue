import firebase from "firebase/app";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
      }
    },
    async registration({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 0,
            name
          });
      } catch (e) {
        commit("setError", e);
      }
    },
    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  }
};
