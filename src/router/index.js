import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: () => import('@/views/UsersPage.vue')
  },
  {
    path: '/users/:id',
    name: 'UserPage',
    component: () => import('@/views/UserPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
