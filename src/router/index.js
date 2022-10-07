import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddressView from '../views/address/functions.vue'
import AddressSourceView from '../views/address/sourcecode.vue'
import AddressInformations from '../views/address/informations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/address/:address/sourcecode',
      name: 'addresssource',
      component: AddressSourceView
    },
    {
      path: '/address/:address/infos',
      name: 'addressinfos',
      component: AddressInformations
    },
    {
      path: '/address/:address/',
      name: 'address',
      component: AddressView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
