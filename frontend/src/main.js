import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

import './scss/main.scss'

//axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
