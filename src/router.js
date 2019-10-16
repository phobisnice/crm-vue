import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        layout: "main",
        auth: true
      }
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("./views/Categories.vue"),
      meta: {
        layout: "main",
        auth: true
      }
    },
    {
      path: "/detail-record/:id",
      name: "detail-record",
      component: () => import("./views/DetailRecord.vue"),
      meta: {
        layout: "main",
        auth: true
      }
    },
    {
      path: "/history",
      name: "history",
      component: () => import("./views/History.vue"),
      meta: {
        layout: "main",
        auth: true
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
        layout: "main",
        auth: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      meta: {
        layout: "main",
        auth: true
      }
    },
    {
      path: "/record",
      name: "record",
      component: () => import("./views/Record.vue"),
      meta: {
        layout: "main",
        auth: true
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

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
