import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../pages/Dashboard'
import Attendances from '../pages/Attendances'
import Requests from '../pages/Requests'

import GroupRequests from '../pages/GroupRequests'
import GroupAttendances from '../pages/GroupAttendances'
import GroupReport from '../pages/GroupReport'
import GroupReportPersonal from '../pages/GroupReportPersonal'
import Groups from '../pages/Groups'
import Group from '../pages/Group'

import UserSettingsProfile from '../pages/UserSettingsProfile'
import UserSettingsPassword from '../pages/UserSettingsPassword'
import UserSettingsSecurity from '../pages/UserSettingsSecurity'
import CompanySettingsProfile from '../pages/CompanySettingsProfile'
import CompanySettingsUsers from '../pages/CompanySettingsUsers'
import CompanySettingsUsersAdd from '../pages/CompanySettingsUsersAdd'
import CompanySettingsUsersAddMulti from '../pages/CompanySettingsUsersAddMulti'
import CompanySettingsBusinessDays from '../pages/CompanySettingsBusinessDays'
import CompanySettingsHolidays from '../pages/CompanySettingsHolidays'
import CompanySettingsAllowedIPs from '../pages/CompanySettingsAllowedIPs'

import Error404 from '../pages/Error404'

Vue.use(Router)

const appName = window.initialStates().meta.app_name

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { title: `Dashboard - ${appName}` } },
    { path: '/attendances', name: 'attendances', component: Attendances, meta: { title: `Attendances - ${appName}` } },
    { path: '/requests', name: 'requests', component: Requests, meta: { title: `Requests - ${appName}` } },
    { path: '/groups/:id/requests', name: 'group-requests', component: GroupRequests, meta: { title: `Group Requests - ${appName}` } },
    { path: '/groups/:id/attendances', name: 'group-attendances', component: GroupAttendances, meta: { title: `Group Attendances - ${appName}` } },
    { path: '/groups/:id/report', name: 'group-report', component: GroupReport, meta: { title: `Group Report - ${appName}` } },
    { path: '/groups/:id/report/:user_id', name: 'group-report-personal', component: GroupReportPersonal, meta: { title: `Group Report Personal - ${appName}` } },
    { path: '/groups/:id/users', name: 'group', component: Group, meta: { title: `Group - ${appName}` } },
    { path: '/groups/:id', redirect: '/groups/:id/users' },
    { path: '/groups', name: 'groups', component: Groups, meta: { title: `Groups - ${appName}` } },
    { path: '/settings/profile', name: 'user-settings-profile', component: UserSettingsProfile, meta: { title: `User Settings Profile - ${appName}` } },
    { path: '/settings/password', name: 'user-settings-password', component: UserSettingsPassword, meta: { title: `User Settings Password - ${appName}` } },
    { path: '/settings/security', name: 'user-settings-security', component: UserSettingsSecurity, meta: { title: `User Settings Security - ${appName}` } },
    { path: '/settings', redirect: '/settings/profile' },
    { path: '/company/settings/profile', name: 'company-settings-profile', component: CompanySettingsProfile, meta: { title: `Company Settings Profile - ${appName}` } },
    { path: '/company/settings/users', name: 'company-settings-users', component: CompanySettingsUsers, meta: { title: `Company Settings Users - ${appName}` } },
    { path: '/company/settings/users/add', name: 'company-settings-users-add', component: CompanySettingsUsersAdd, meta: { title: `Company Settings Add User - ${appName}` } },
    { path: '/company/settings/users/add-multi', name: 'company-settings-users-add-multi', component: CompanySettingsUsersAddMulti, meta: { title: `Company Settings Add Multiple Users - ${appName}` } },
    { path: '/company/settings/business-days', name: 'company-settings-business-days', component: CompanySettingsBusinessDays, meta: { title: `Company Settings Business Days - ${appName}` } },
    { path: '/company/settings/holidays', name: 'company-settings-holidays', component: CompanySettingsHolidays, meta: { title: `Company Settings Holidays - ${appName}` } },
    { path: '/company/settings/allowed-ips', name: 'company-settings-allowed-ips', component: CompanySettingsAllowedIPs, meta: { title: `Company Settings Allowed IPs - ${appName}` } },
    { path: '/company/settings', redirect: '/company/settings/profile' },
    { path: '/404', name: 'error-404', component: Error404, meta: { title: '404 Page not found' } },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
