<template>
  <div class="product-card">
    <div class="product-card__image">
      <img :src="cardImage" :alt="cardTitle">
    </div>
    <div class="product-card__name">
      {{ cardTitle }}
    </div>
    <div class="product-card__description">
      {{ cardDesc }}
    </div>
    <div class="product-card__price">
      {{ cardPrice }} руб
    </div>
    <button class="add" @click.stop="addItem">В корзину</button>
    <button class="delete" @click.stop="deleteItem">Удалить</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: [
    'cardImage',
    'cardTitle',
    'cardDesc',
    'cardId',
    'cardPrice'    
  ],
  data () {
    return {
      title: this.cardTitle,
      description: this.cardDesc,
      id: this.cardId,
      price: this.cardPrice,
      image: this.cardImage
    }
  },
  methods: {
    addItem () {
      this.$emit(
        'onCartItemAdd',
        {
          title: this.title,
          id: this.id,
          price: this.price,
          image: this.image
        }
      )
    },
    deleteItem () {
      this.$emit(
        'onCartItemDelete',
        {
          title: this.title,
          id: this.id,
          price: this.price
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  border:  1px solid rgb(230, 227, 227);
  min-height: 10px;
  border-radius: 15px;
  transition: ease-in-out .2s;
  padding: 15px;
  width: 100%;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 0px 11px 33px 3px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 11px 33px 3px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 11px 33px 3px rgba(34, 60, 80, 0.2);
    transform: translateY(1%)
  }
  &__image {
    position: relative;
    width: 100%;
    padding-bottom: 92%;
    overflow: hidden;
    border-radius: 15px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__name {
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 10px;
  }
  &__description {
    font-size: 16px;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    overflow: hidden;
  }
  &__price {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  button {
    width: 100%;
    height: 40px;
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
    &.delete {
      margin-top: 10px;
      background-color:rgb(221, 54, 54);
      &:hover {
        background-color:rgb(165, 39, 39);
      }
    }
  }
}
</style>