import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './locale/messages'
import store from './store'

import axios from 'axios'

import './scss/main.scss'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

// axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.baseURL = 'http://namespace_1.localhost:3000/api/v1'
axios.defaults.headers.common['Authorization'] = 'Bear eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTk4OTUzOTgsImp0aSI6ImJmNmYyMDY1LTNhZTAtNGJhYS1iODhlLWI0YjUzMTc4YTQ1MyIsInN1YiI6MX0.2oPg2ApRG-fpVnMTDz3qCDVj-S45W6wCt-j9EO0ZVvo'
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
