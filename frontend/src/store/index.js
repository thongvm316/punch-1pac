import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import headerAnnouncements from './modules/header-announcements'
import punch from './modules/punch'
import companyUsers from './modules/company-users'
import announcements from './modules/announcements'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    headerAnnouncements,
    punch,
    companyUsers,
    announcements
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
