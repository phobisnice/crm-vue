<template>
  <form class="card auth-card z-depth-5">
    <div class="card-content">
      <b class="card-title center-align">Денежный контроль</b>
      <div class="input-field">
        <i class="material-icons prefix">email</i>
        <input id="email" type="text" class="validate" />
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">vpn_key</i>
        <input id="password" type="password" class="validate" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
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
        <a class="auth-link" href="/">Зарегистрироваться</a>
      </p>
    </div>
  </form>
</template>
