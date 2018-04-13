import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../pages/Dashboard'
import GroupAttendances from '../pages/GroupAttendances'
import Attendances from '../pages/Attendances'
import GroupRequests from '../pages/GroupRequests'
import GroupReport from '../pages/GroupReport'
import Requests from '../pages/Requests'
import Groups from '../pages/Groups'
import Group from '../pages/Group'
import Notifications from '../pages/Notifications'

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

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { title: 'Dashboard - 1Punch' } },
    { path: '/attendances', name: 'attendances', component: Attendances, meta: { title: 'Attendances - 1Punch' } },
    { path: '/requests', name: 'requests', component: Requests, meta: { title: 'Requests - 1Punch' } },
    { path: '/groups/:id/requests', name: 'group-requests', component: GroupRequests, meta: { title: 'Group Requests - 1Punch' } },
    { path: '/groups/:id/attendances', name: 'group-attendances', component: GroupAttendances, meta: { title: 'Group Attendances - 1Punch' } },
    { path: '/groups/:id/report', name: 'group-report', component: GroupReport, meta: { title: 'Group Report - 1Punch' } },
    { path: '/groups/:id/users', name: 'group', component: Group, meta: { title: 'Group - 1Punch' } },
    { path: '/groups/:id', redirect: '/groups/:id/users' },
    { path: '/groups', name: 'groups', component: Groups, meta: { title: 'Groups - 1Punch' } },
    { path: '/notifications', name: 'notifications', component: Notifications, meta: { title: 'Notifications - 1Punch' } },
    { path: '/settings/profile', name: 'user-settings-profile', component: UserSettingsProfile, meta: { title: 'User Settings Profile - 1Punch' } },
    { path: '/settings/password', name: 'user-settings-password', component: UserSettingsPassword, meta: { title: 'User Settings Password - 1Punch' } },
    { path: '/settings/security', name: 'user-settings-security', component: UserSettingsSecurity, meta: { title: 'User Settings Security - 1Punch' } },
    { path: '/settings', redirect: '/settings/profile' },
    { path: '/company/settings/profile', name: 'company-settings-profile', component: CompanySettingsProfile, meta: { title: 'Company Settings Profile - 1Punch' } },
    { path: '/company/settings/users', name: 'company-settings-users', component: CompanySettingsUsers, meta: { title: 'Company Settings Users - 1Punch' } },
    { path: '/company/settings/users/add', name: 'company-settings-users-add', component: CompanySettingsUsersAdd, meta: { title: 'Company Settings Add User - 1Punch' } },
    { path: '/company/settings/users/add-multi', name: 'company-settings-users-add-multi', component: CompanySettingsUsersAddMulti, meta: { title: 'Company Settings Add Multiple Users - 1Punch' } },
    { path: '/company/settings/business-days', name: 'company-settings-business-days', component: CompanySettingsBusinessDays, meta: { title: 'Company Settings Business Days - 1Punch' } },
    { path: '/company/settings/holidays', name: 'company-settings-holidays', component: CompanySettingsHolidays, meta: { title: 'Company Settings Holidays - 1Punch' } },
    { path: '/company/settings/allowed-ips', name: 'company-settings-allowed-ips', component: CompanySettingsAllowedIPs, meta: { title: 'Company Settings Allowed IPs - 1Punch' } },
    { path: '/company/settings', redirect: '/company/settings/profile' },
    { path: '/404', name: 'error-404', component: Error404 },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
