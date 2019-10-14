import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyB__L_c7jyUoNymGVZWtgHasJSUr8522cM",
  authDomain: "vue-crm-13af3.firebaseapp.com",
  databaseURL: "https://vue-crm-13af3.firebaseio.com",
  projectId: "vue-crm-13af3",
  storageBucket: "vue-crm-13af3.appspot.com",
  messagingSenderId: "81906462052",
  appId: "1:81906462052:web:4f8c0dc0e24b865d161e71"
});

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter("date", dateFilter);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
