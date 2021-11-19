import Vue from 'vue'
import VueRouter from "vue-router"

import Products from "../components/Products.vue"
import Cart from "../components/Cart.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'products',
      component: Products,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      props: true
    }
  ],
  mode: 'history'
})

export default router
