import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch("getUserId");
        const newRecord = await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);

        return newRecord;
      } catch (e) {
        commit("setError", e);
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUserId");
        const data = (await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .once("value")).val();

        return data
          ? Object.keys(data).map(key => ({ ...data[key], id: key }))
          : [];
      } catch (e) {
        commit("setError", e);
      }
    }
  }
};
