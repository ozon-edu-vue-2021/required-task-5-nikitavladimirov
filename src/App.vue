<template>
  <div id="app">
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  created () {
    this.$store.dispatch('fetchCards', this.url)
  },
  data () {
    return {
      url: 'https://random-data-api.com/api/food/random_food?size=30',
    }
  },
};
</script>

<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 24px;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

html, body {
  scroll-behavior: smooth;
  width: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
