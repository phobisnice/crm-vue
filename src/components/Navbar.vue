<template>
  <nav class="navbar z-depth-5">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle-menu')">
          <i class="material-icons">dehaze</i>
        </a>
        <span>{{currentDate | date}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger" href="#" data-target="dropdown" ref="dropdown">
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link class="blue-grey-text" to="/profile">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="blue-grey-text" href="#" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    logout() {
      this.$router.push("/login?message=logout");
    }
  },
  mounted() {
    const dateInterval = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    const dropdownMenu = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    });

    this.$on("hook:beforeDestroy", () => {
      clearInterval(dateInterval);
      dropdownMenu.destroy();
    });
  }
};
</script>
