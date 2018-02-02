import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './locale'
import store from './store'
import axios from 'axios'

/* eslint-disable no-unused-vars */
import filterDatetime from './filters/datetime'

import './scss/main.scss'

// axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.baseURL = 'http://namespace_1.localhost:3000/api/v1'
axios.defaults.headers.common['Authorization'] = 'Bear eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjAxMjk1MTcsImp0aSI6IjE2NjM1MmI4LWJiZGQtNDcxZi05ZWJlLWY4NGRmNWUzMTYwMiIsInN1YiI6Mn0.h0cY5TECDMmfD0moAklDlDqsAPRePzJFa2sEV1eite4'
axios.defaults.headers.common['Accept'] = 'application/json'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
