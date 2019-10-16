<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @toggle-menu="menuStateHandler" />

      <Sidebar :isOpen="isOpen" />

      <main :class="{full: !isOpen}" class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue-grey darken-1"
          to="/record"
          v-tooltip="'Создать запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { mapGetters, mapActions } from "vuex";
import messages from "@/utils/messages";

export default {
  name: "main-layout",
  data() {
    return {
      isOpen: false,
      loading: true
    };
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    ...mapGetters(["getInfo", "getError"])
  },
  methods: {
    ...mapActions(["fetchInfo"]),
    menuStateHandler() {
      this.isOpen = !this.isOpen;
    }
  },
  watch: {
    getError(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    }
  },
  async mounted() {
    if (!this.getInfo.bill || !this.getInfo.name) {
      await this.fetchInfo();
    }

    this.loading = false;
  }
};
</script>
