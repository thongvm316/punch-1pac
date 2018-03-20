import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './locale'
import store from './store'
import axios from 'axios'
import moment from './moment'

/* eslint-disable no-unused-vars */
import filterDatetime from './filters/datetime'

import './scss/main.scss'

axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.baseURL = '/api/v1'
// axios.defaults.baseURL = 'http://namespace_1.localhost:3000/api/v1'
// axios.defaults.headers.common['Authorization'] = 'Bear eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjI4MDc4OTAsImp0aSI6ImMzNmM3YmNiLTA2MzAtNGE1Yy05YjUyLWY3MTUzY2E4ZGMyNyIsInN1YiI6Mn0.7-RIQ1ftgcUTAQr48muGWMP4Z6x9NHsSa50x0oRV5uw'
axios.defaults.headers.common['Accept'] = 'application/json'

Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
