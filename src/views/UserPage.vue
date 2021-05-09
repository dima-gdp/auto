<template>
  <section class="user">
    <p class="user__error container" v-if="error">Ошибка</p>
    <div class="user__container container" v-if="userData">
      <h1>{{`${userData.first_name} ${userData.last_name}`}}</h1>
      <div class="user__img">
        <img :src="userData.avatar" alt="avatar" v-if="userData.avatar">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      userData: null,
      error: false
    }
  },
  mounted () {
    this.error = false
    const userId = this.$route.params.id
    const userData = this.$store.getters.usersList.find(user => user.id === userId)
    userData ? this.userData = userData : this.error = true
  }
}
</script>
