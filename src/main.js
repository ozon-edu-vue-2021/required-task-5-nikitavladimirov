import Vue from 'vue'
import App from './App.vue'
import router from './router/routes.js'
import { store } from "./store/store.js"
import VueSimpleAlert from "vue-simple-alert"

Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
