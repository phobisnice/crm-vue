import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const FBK = process.env.VUE_APP_FB;

firebase.initializeApp({
  apiKey: FBK,
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
Vue.filter("currencyFilter", currencyFilter);
Vue.component("Loader", Loader);

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
