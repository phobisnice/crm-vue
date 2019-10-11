<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title center">Денежный контроль</span>
      <div class="input-field">
        <i class="material-icons prefix">email</i>
        <input id="email" type="text" />
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">vpn_key</i>
        <input id="password" type="password" class="validate" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">account_circle</i>
        <input id="name" type="text" class="validate" />
        <label for="name">Имя</label>
        <small class="helper-text invalid">Name</small>
      </div>
      <p class="privacy-checkbox">
        <label>
          <input type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
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
        <a class="auth-link" href="/">Войти!</a>
      </p>
    </div>
  </form>
</template>
