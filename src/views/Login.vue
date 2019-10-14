<template>
  <form class="card auth-card z-depth-5" @submit.prevent="submitHandler">
    <div class="card-content">
      <b class="card-title center-align">Денежный контроль</b>
      <div class="input-field">
        <i class="material-icons prefix">email</i>
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >Введите почту</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >Некорректное значение</small>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">vpn_key</i>
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required)}"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >Введите пароль</small>
      </div>
    </div>
    <div class="card-bottom">
      <div>
        <button
          class="btn btn-large z-depth-3 cyan waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link class="auth-link" to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import messages from "@/utils/messages";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: { email, required },
    password: { required }
  },
  methods: {
    submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      };

      this.$router.push("/");
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  }
};
</script>
