import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      cards: [],
      cartItems: [],
      cartItemCount: 0,
      totalPrice: 0
  },
  getters: {
      getCards: state => { return state.cards },
      getCartItems: state => { return state.cartItems },
      getCartItemCount: state => { return state.cartItemCount },
      getTotalPrice: state => { return state.totalPrice }
  },
  mutations: {
      setCards(state, data) {
          state.cards = data
          state.cards.map(item => {
            item.price = Math.floor(Math.random() * 101)
            return item
          })
      },
      addToCart (state, payload) {
        let item = { ...payload, quantity: 1 }
        if (state.cartItems.length > 0) {
          if(state.cartItems.some(elem => elem.id === item.id)) {
            const itemIndex = state.cartItems.findIndex(elem => elem.id === item.id)
            state.cartItems[itemIndex].quantity += 1
          } else state.cartItems.push(item)
        } else state.cartItems.push(item)
        state.cartItemCount++
        state.totalPrice += item.price
      },
      removeFromCart (state, payload) {
        if (state.cartItems.length > 0) {
          if(state.cartItems.some(elem => elem.id === payload.id)) {
            const itemIndex = state.cartItems.findIndex(elem => elem.id === payload.id)
            if(state.cartItems[itemIndex].quantity !== 0) {
              state.cartItems[itemIndex].quantity -= 1
              state.cartItemCount--
              state.totalPrice -= payload.price
            }
            if(state.cartItems[itemIndex].quantity === 0) {
              state.cartItems.splice(itemIndex, 1)
            }
          } 
        }
      },
      nullOrder (state) {
        state.cartItems = []
        state.cartItemCount = 0
        state.totalPrice = 0
      }
  },
  actions: {
      fetchCards (context) {
          Vue.axios.get('https://random-data-api.com/api/food/random_food?size=30')
              .then(response => {
                  context.commit('setCards', response.data)
              })
              .catch((error) => {
                  console.log('error', error.statusText)
              });
      },
      addToCart (context, payload) {
        context.commit('addToCart', payload)
      },
      removeFromCart (context, payload) {
        context.commit('removeFromCart', payload)
      },
      nullOrder (context) {
        context.commit('nullOrder')
      }
  }
})