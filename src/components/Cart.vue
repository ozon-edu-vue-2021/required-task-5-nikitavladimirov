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
        :key="item.id * Math.random() * 101"
        >
        <div class="item">
           <div class="item__image">
             <img :src="item.image" :alt="item.title">
           </div>
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
    cartItems () {
      return this.$store.getters.getCartItems
    },
    totalPrice () {
      return this.$store.getters.getTotalPrice
    },
    itemsList () {
      return this.cartItems.map(item => {
        return item.title
      }).join(', ') 
    }
  },
  methods: {
    checkout () {
      console.log(this.itemsList)
      this.$fire({
        title: "Успешно",
        text: `Заказ из ${this.itemsList} на сумму ${this.totalPrice} руб. размещен`,
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
      border-radius: 15px;
      padding-left: 20px;
      border: 1px solid grey;
      &__name, &__price, &__quantity {
        flex: 0 1 33.333%;
        margin-right: 10px;
      }
      &__image {
        justify-self: start;
        position: relative;
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 10px;
        margin-right: 10px;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain
        }
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