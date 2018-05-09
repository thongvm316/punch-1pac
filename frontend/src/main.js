import Vue from 'vue'
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

axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.baseURL = '/api/v1'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 401 && error.response.data && error.response.data.code === 'unauthenticated') {
    window.location = `/?error_msg=${error.response.data.message}`
    return
  }
  return Promise.reject(error)
})

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
