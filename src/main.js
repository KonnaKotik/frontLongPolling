import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime'
import {EagleModal} from 'vue-eagle-modal'
import VueCookie from 'vue-cookie'


Vue.config.productionTip = false

Vue.component('datetime', Datetime)
Vue.use(BootstrapVue)
Vue.use(EagleModal)


App.$cookie = VueCookie

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
