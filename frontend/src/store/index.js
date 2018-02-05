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
import companyBusinessDays from './modules/company-businessdays'
import companyAllowedIPs from './modules/company-allowed_ips'
import companyCustomHolidays from './modules/company-custom_holidays'

import userSessions from './modules/user-sessions'
import requests from './modules/requests'

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
    companyBusinessDays,
    companyAllowedIPs,
    companyCustomHolidays,
    requests,
    userSessions
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
