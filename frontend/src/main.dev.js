import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import i18n from './locale'
import store from './store'
import moment from './moment'
import authorization from './authorization'

/* eslint-disable no-unused-vars */
import filterDatetime from './filters/datetime'
import currentUser from './mixins/global/current-user'
import pageAuthorization from './mixins/global/page-authorization'

import './scss/main.scss'
import './config/axios/dev'

Vue.use(Vuelidate)
Vue.prototype.$moment = moment
Vue.prototype.$auth = authorization
Vue.mixin(currentUser)
Vue.mixin(pageAuthorization)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
