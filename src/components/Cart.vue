<template>
  <div>
    <div class="container">
      <router-link :to="{name: 'products'}">
        <div class="products-back">
          В каталог
        </div>
      </router-link>

      <div class="products-list" 
        v-for="item in cartItems"
        :key="item.id"
        >
        <div class="item">
          <div class="item__name">
            Название: {{ item.title }}
          </div>
          <div class="item__price">
            Цена: {{ item.price }}
          </div>
          <div class="item__quantity">
            Кол-во: {{ item.quantity }} шт.
          </div>
        </div>
      </div>

      <div class="checkout-wrapper">
        <button class="checkout-button" @click="checkout($event)">Оформить</button>
        <div class="total-price">Стоимость: {{ totalPrice }} руб</div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    getCartItems () {
      return this.$store.getters.getCartItems
    },
    getTotalPrice () {
      return this.$store.getters.getTotalPrice
    }
  },
  watch: {
    getCartItems: function () {
      this.cartItems = this.getCartItems
    },
    getTotalPrice: function () {
      this.totalPrice = this.getTotalPrice
    }
  },
  data () {
    return {
      cartItems: [],
      totalPrice: 0
    }
  },
  methods: {
    checkout () {
      console.log('dsfd')
      this.$fire({
        title: "Успешно",
        text: `Заказ на сумму ${this.totalPrice} руб. размещен`,
        type: "success",
        timer: 3000
      })
      this.$store.dispatch('nullOrder')
      this.$router.push({name: 'products'})
    }
  }
}
</script>

<style lang="scss" scoped>
.products-back {
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
.products-list {
    .item {
      display: flex;
      height: 40px;
      align-items: center;
      margin-bottom: 10px;
      padding: 30px;
      border: 1px solid grey;
      &__name, &__price, &__quantity {
        flex: 0 1 33.333%;
        margin-right: 10px;
      }
    }
  }

  .checkout-wrapper {
    display: flex;
    justify-content: left;
    align-items: center;
    .checkout-button {
      width: 100%;
      height: 40px;
      width: 300px;
      margin-right: 40px;
      color: white;
      background-color: rgb(71, 112, 224);
      border: none;
      border-radius: 15px;
      font-size: 14px;
      text-transform: uppercase;
      transition: ease-in-out .2s;
      &:hover {
        background-color: rgb(71, 71, 206);
        cursor: pointer;
      }
    }
  }
</style>