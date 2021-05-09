import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersData: [],
    // Пришлось добавить, так как не могу делать запросы
    addedUsers: [],
    deletedUsers: []
  },
  mutations: {
    setUsersData(state, data) {
      state.usersData = data
      state.usersData.data = [...state.usersData.data, ...state.addedUsers]
      state.usersData.data = state.usersData.data.filter(el => !state.deletedUsers.includes(el.id))
    },
    pushUser(state, data) {
      state.usersData.data.push(data)
      state.addedUsers.push(data)
    },
    deleteUser(state, id) {
      state.usersData.data = state.usersData.data.filter(el => el.id !== id)
      state.deletedUsers.push(id)
    }
  },
  actions: {
    async fetchUsersData({ commit }) {
      const fetchUsers = await axios.get('https://reqres.in/api/users?page=1')
      commit('setUsersData', fetchUsers.data)
    }
  },
  getters: {
    usersList: state => state.usersData.data || []
  }
})
