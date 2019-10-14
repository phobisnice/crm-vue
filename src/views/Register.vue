<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title center">Денежный контроль</span>
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
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >Введите пароль</small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >Пароль должен быть не менее {{$v.password.$params.minLength.min}} символов. Сейчас {{password.length}}.</small>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">account_circle</i>
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >Введите Ваше имя</small>
      </div>
      <div class="privacy-checkbox">
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
        <div>
          <small
            v-if="$v.agree.$dirty && !$v.agree.checked"
            class="helper-text invalid"
          >Нужно согласиться с правилами сервиса</small>
        </div>
      </div>
    </div>
    <div class="card-bottom">
      <div>
        <button
          class="btn btn-large z-depth-3 cyan waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link class="auth-link" to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false
    };
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(8), required },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      this.$router.push("/?message=registration");
    }
  }
};
</script>
