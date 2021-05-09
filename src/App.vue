<template>
  <div>
    <nav class="nav container">
      <router-link :to="{ name: 'Home' }">Range слайдер</router-link>
      <router-link :to="{ name: 'Users' }">Пользователи</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/styles.scss';
</style>
