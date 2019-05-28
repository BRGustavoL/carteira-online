import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueFire from 'vuefire';
import 'firebase/firestore'
import Toasted from 'vue-toasted';
import VueRouter from 'vue-router';
import { routes } from './routes';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

Vue.use(firebase)
Vue.use(Toasted);
Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes: routes
});



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
