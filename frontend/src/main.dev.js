import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import i18n from './locale'
import store from './store'
import axios from 'axios'
import moment from './moment'
import authorization from './authorization'

/* eslint-disable no-unused-vars */
import filterDatetime from './filters/datetime'
import currentUser from './mixins/current-user'
import pageAuthorization from './mixins/page-authorization'

import './scss/main.scss'

axios.defaults.baseURL = 'http://namespace_1.localhost:3000/api/v1'
axios.defaults.headers.common['Authorization'] = 'Bear eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODE0OTQxNTEsImp0aSI6IjQyODRmZDdjLTk3MWQtNDlkNC04MTJlLWVhY2NlZDU3OTcwZSIsInN1YiI6Mn0.5wPjB18WkGOosnpwzJA4_5aOkhYSr3V5ogemw9sAoQ4'
axios.defaults.headers.common['Accept'] = 'application/json'

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
