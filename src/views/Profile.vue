<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">Имя</label>
        <small v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid">Введите имя</small>
      </div>

      <button class="btn btn-large z-depth-3 cyan waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "profile",
  data() {
    return {
      name: ""
    };
  },
  metaInfo: {
    title: "Профиль"
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(["getInfo"])
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        await this.updateInfo({ name: this.name });
      } catch {
        console.log(e);
      }
    }
  },
  mounted() {
    this.name = this.getInfo.name;
    setTimeout(window.M.updateTextFields, 0);
  }
};
</script>
