import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("./views/Categories.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/detail-record",
      name: "detail-record",
      component: () => import("./views/DetailRecord.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/history",
      name: "history",
      component: () => import("./views/History.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        layout: "empty"
      }
    },
    {
      path: "/planning",
      name: "planning",
      component: () => import("./views/Planning.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/record",
      name: "record",
      component: () => import("./views/Record.vue"),
      meta: {
        layout: "main"
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      meta: {
        layout: "empty"
      }
    }
  ]
});
