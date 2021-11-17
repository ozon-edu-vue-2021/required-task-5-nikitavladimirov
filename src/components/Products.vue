<template>
  <div>
    <div class="container">
      <keep-alive>
        <router-link :to="{name: 'cart'}">
          <div class="cart">
            Корзина: {{ cartItemCount }} шт.
          </div> 
        </router-link>
      </keep-alive>
      <div class="grid-products">
        <div v-for="item in cards" 
        :key="item.id">
          <ProductCard
            :cardImage="item.image"
            :cardTitle="item.dish"
            :cardDesc="item.description.slice(0,50)+'...'"
            :cardId="item.id"
            :cardPrice="item.price"
            @onCartItemAdd="addToCart($event)"
            @onCartItemDelete="deleteFromCart($event)"
          />
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue"

export default {
  name: 'Products',
  components: {
    ProductCard
  },
  computed: {
    getCards () {
      return this.$store.getters.getCards
    },
    getCartItemCount () {
      return this.$store.getters.getCartItemCount
    },
    getCartItems () {
      return this.$store.getters.getCartItems
    },
  },
  watch: {
    getCards: function () {
      this.cards = this.getCards
    },
    getCartItemCount: function () {
      this.cartItemCount = this.getCartItemCount
    },
    getCartItems: function () {
      this.cartItems = this.getCartItems
    },
  },
  data () {
    return {
      cards: [],
      cartItemCount: 0,
      cartItems: [],
    }
  },
  methods: {
    addToCart (item) {
      this.$store.dispatch('addToCart', item)
    },
    deleteFromCart (item) {
      this.$store.dispatch('removeFromCart', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .cart {
    color: black;
    display: inline-block;
    padding: 25px 20px ;
    border: 1px solid rgb(221, 218, 218);
    text-align: center;
    border-radius: 15px;
    margin-bottom: 20px;
    transition: ease-in-out .3s;
    &:hover {
      background: rgb(246, 246, 246);
    }
  }
</style>