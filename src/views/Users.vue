<template>
  <div class="container">
    <h1>Users</h1>
    <form @submit.prevent="searchUsers">
      <input type="text" v-model.trim="searchInput">
      <button type="submit">search</button>
    </form>
    <form @submit.prevent="addUser">
      <input type="text" v-model.trim="userNameInput">
      <button type="submit">add</button>
    </form>
    <div class="error" v-if="error">Ошибка</div>
    <ul>
      <li v-for="(user, idx) in filteredUsers" :key="idx">
        <router-link :to="{name: 'UserPage', params: {id: user.id}}">{{`${user.first_name} ${user.last_name}`}}</router-link>
        <button type="button" @click="userDelete(user.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Users',
  data () {
    return {
      loading: true,
      error: false,
      filteredUsers: [],
      searchInput: '',
      userNameInput: ''
    }
  },
  computed: {
    ...mapGetters(['usersList'])
  },
  watch: {
    usersList(value) {
      this.filteredUsers = value
    }
  },
  methods: {
    ...mapActions(['fetchUsersData']),
    ...mapMutations(['deleteUser', 'pushUser']),
    searchUsers() {
      if (this.searchInput === '') {
        this.filteredUsers = this.usersList
      }
      this.filteredUsers = this.filteredUsers.filter(user => {
        const firstName = user.first_name.toLowerCase()
        const lastName = user.last_name.toLowerCase()
        const searchInput = this.searchInput.toLowerCase()
        return firstName.includes(searchInput) || lastName.includes(searchInput)
      })
    },
    userDelete(id) {
      this.deleteUser(id)
    },
    addUser() {
      const userName = this.userNameInput.split(' ')
      if (!userName) return
      const userData = {
        first_name: userName[0],
        last_name: userName[1] || '',
        id: Math.floor(Math.random() * 10000)
      }
      this.pushUser(userData)
    }
  },
  async mounted () {
    this.loading = true
    this.error = false
    try {
      await this.fetchUsersData()
      this.filteredUsers = this.usersList
    } catch (e) {
      this.error = true
    }
    this.loading = false
  }
}
</script>
