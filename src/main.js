import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import VueSwal from 'vue-swal'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Loading)
Vue.use(VueSwal)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
