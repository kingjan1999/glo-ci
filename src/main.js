import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import VueSwal from 'vue-swal'
import VeeValidate from 'vee-validate'

import * as Sentry from '@sentry/browser'

import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { NODE_ENV } from './vars'

import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/global.css'

Vue.use(BootstrapVue)
Vue.use(Loading)
Vue.use(VueSwal)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields'
})

Vue.config.productionTip = false

if (NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://b57b8dbaac2f4116aacc69d0d1b27786@sentry.io/1432442',
    integrations: [
      new Sentry.Integrations.Vue({
        Vue,
        attachProps: true
      })
    ]
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
