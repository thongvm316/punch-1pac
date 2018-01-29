import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

// import axios from 'axios'

import './scss/main.scss'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'Hello World!',
      goodbye: 'Good bye!'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
      goodbye: 'さよなら'
    }
  },
  vi: {
    message: {
      hello: 'Xin chào thế giới!',
      goodbye: 'Tạm biệt!'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ja',
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
