import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import headerAnnouncements from './modules/header-announcements'
import punch from './modules/punch'
import companyUsers from './modules/company-users'
import companyDepartments from './modules/company-departments'

import announcements from './modules/announcements'
import announcement from './modules/announcement'
import userSessions from './modules/user-sessions'
import attendances from './modules/attendances'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    headerAnnouncements,
    punch,
    companyUsers,
    companyDepartments,
    announcements,
    announcement,
    userSessions,
    attendances
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
