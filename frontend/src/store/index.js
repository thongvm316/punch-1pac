import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import initialStates from './modules/initial-states'

import announcements from './modules/announcements'
import attendances from './modules/attendances'
import punch from './modules/punch'

import companyUsers from './modules/company-users'
import companyDepartments from './modules/company-departments'
import companyBusinessDays from './modules/company-businessdays'
import companyAllowedIPs from './modules/company-allowed_ips'
import companyHolidays from './modules/company-holidays'

import userSessions from './modules/user-sessions'
import userPassword from './modules/user-password'

import requests from './modules/requests'
import groups from './modules/groups'
import group from './modules/group'

import chart from './modules/chart'
import calendar from './modules/calendar'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    initialStates,
    punch,
    announcements,
    attendances,
    companyUsers,
    companyDepartments,
    companyBusinessDays,
    companyAllowedIPs,
    companyHolidays,
    userSessions,
    userPassword,
    requests,
    groups,
    group,
    chart,
    calendar
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
