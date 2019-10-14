<template>
  <ul :class="{open: isOpen}" class="sidenav app-sidenav z-depth-5">
    <li v-for="link in links" :key="link.url">
      <router-link
        :to="link.url"
        class="waves-effect waves-orange pointer"
        exact
        active-class="active"
      >{{link.title}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      links: [
        { title: "Счет", url: "/" },
        { title: "История", url: "/history" },
        { title: "Планирование", url: "/planning" },
        { title: "Новая запись", url: "/record" },
        { title: "Категории", url: "/categories" }
      ]
    };
  }
};
</script>
