import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './message/message'

// import axios from 'axios'

import './scss/main.scss'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'vi',
  fallbackLocale: 'en',
  messages
})

// axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
