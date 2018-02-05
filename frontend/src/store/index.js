import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import headerAnnouncements from './modules/header-announcements'
import announcements from './modules/announcements'
import announcement from './modules/announcement'
import attendances from './modules/attendances'
import punch from './modules/punch'

import companyUsers from './modules/company-users'
import companyDepartments from './modules/company-departments'
import companyAllowedIPs from './modules/company-allowed_ips'

import userSessions from './modules/user-sessions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    headerAnnouncements,
    punch,
    announcements,
    announcement,
    attendances,
    companyUsers,
    companyDepartments,
    companyAllowedIPs,
    userSessions
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
