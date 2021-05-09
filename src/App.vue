<template>
  <div>
    <div class="header">
      <div class="header__container container">
        <nav class="nav">
          <router-link :to="{ name: 'HomePage' }">Range слайдер</router-link>
          <router-link :to="{ name: 'UsersPage' }">Пользователи</router-link>
        </nav>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/styles.scss';
</style>
