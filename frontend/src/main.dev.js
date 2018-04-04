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

axios.defaults.baseURL = 'http://namespace_1.localhost:3000/api/v1'
axios.defaults.headers.common['Authorization'] = 'Bear eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjU0MDM5MjksImp0aSI6IjJkOGE2OTIwLWE2MGMtNGJjOC04NTcyLTU4YjU0M2RkMWZlOSIsInN1YiI6Mn0._Am2x7Tzo8ij3hbusbUDDVbm4aLSVaex-jGd9D3wtD8'
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
