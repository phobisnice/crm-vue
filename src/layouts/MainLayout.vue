<template>
  <div class="app-main-layout">
    <nav class="navbar z-depth-5">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#">
            <i class="material-icons">dehaze</i>
          </a>
          <span>12.12.12</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger" href="#" data-target="dropdown">
              USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li>
                <a href="#">
                  <i class="material-icons">account_circle</i>Профиль
                </a>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav app-sidenav z-depth-5">
      <li>
        <a href="#" class="waves-effect waves-orange pointer">Счет</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-orange pointer">История</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-orange pointer">Планирование</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-orange pointer">Категории</a>
      </li>
    </ul>

    <main class="app-content full">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue-grey darken-1" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>
