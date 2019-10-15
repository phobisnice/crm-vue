<template>
  <div class="app-main-layout">
    <Navbar @toggle-menu="menuStateHandler" />

    <Sidebar :isOpen="isOpen" />

    <main :class="{full: !isOpen}" class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue-grey darken-1" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "main-layout",
  data() {
    return {
      isOpen: false
    };
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    ...mapGetters(["getInfo"])
  },
  methods: {
    ...mapActions(["fetchInfo"]),
    menuStateHandler() {
      this.isOpen = !this.isOpen;
    }
  },
  mounted() {
    if (!Object.keys(this.getInfo).length) {
      this.fetchInfo();
    }
  }
};
</script>
