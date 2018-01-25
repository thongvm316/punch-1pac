import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../pages/Dashboard'
import GroupAttendances from '../pages/GroupAttendances'
import MyAttendances from '../pages/MyAttendances'
import GroupRequests from '../pages/GroupRequests'
import MyRequests from '../pages/MyRequests'
import Groups from '../pages/Groups'
import Group from '../pages/Group'

import Announcements from '../pages/Announcements'
import Announcement from '../pages/Announcement'
import UserSettingsProfile from '../pages/UserSettingsProfile.vue'
import UserSettingsPassword from '../pages/UserSettingsPassword.vue'
import UserSettingsSecurity from '../pages/UserSettingsSecurity.vue'
import CompanySettingsProfile from '../pages/CompanySettingsProfile.vue'
import CompanySettingsTimeLang from '../pages/CompanySettingsTimeLang.vue'
import CompanySettingsUsers from '../pages/CompanySettingsUsers.vue'
import CompanySettingsUsersAdd from '../pages/CompanySettingsUsersAdd.vue'
import CompanySettingsUsersAddMulti from '../pages/CompanySettingsUsersAddMulti.vue'
import CompanySettingsDepartments from '../pages/CompanySettingsDepartments.vue'
import CompanySettingsBusinessDays from '../pages/CompanySettingsBusinessDays.vue'
import CompanySettingsHolidays from '../pages/CompanySettingsHolidays.vue'
import CompanySettingsAllowedIPs from '../pages/CompanySettingsAllowedIPs.vue'

import Error404 from '../pages/Error404'

import Modules from '../pages/Modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/modules', name: 'modules', component: Modules },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { title: 'Dashboard - 1Punch' } },
    { path: '/attendances/groups', name: 'group-attendances', component: GroupAttendances, meta: { title: 'Group Attendances - 1Punch' } },
    { path: '/attendances/my', name: 'my-attendances', component: MyAttendances, meta: { title: 'My Attendances - 1Punch' } },
    { path: '/attendances', redirect: '/attendances/my' },
    { path: '/requests/groups', name: 'group-requests', component: GroupRequests, meta: { title: 'Group Requests - 1Punch' } },
    { path: '/requests/my', name: 'my-requests', component: MyRequests, meta: { title: 'My Requests - 1Punch' } },
    { path: '/requests', redirect: '/requests/my' },
    { path: '/groups/:id', name: 'group', component: Group, meta: { title: 'Group - 1Punch' } },
    { path: '/groups', name: 'groups', component: Groups, meta: { title: 'Groups - 1Punch' } },
    { path: '/announcements/:id', name: 'announcement', component: Announcement, meta: { title: 'Announcement - 1Punch' } },
    { path: '/announcements', name: 'announcements', component: Announcements, meta: { title: 'Announcements - 1Punch' } },
    { path: '/settings/profile', name: 'user-settings-profile', component: UserSettingsProfile, meta: { title: 'User Settings Profile - 1Punch' } },
    { path: '/settings/password', name: 'user-settings-password', component: UserSettingsPassword, meta: { title: 'User Settings Password - 1Punch' } },
    { path: '/settings/security', name: 'user-settings-security', component: UserSettingsSecurity, meta: { title: 'User Settings Security - 1Punch' } },
    { path: '/settings', redirect: '/settings/profile' },
    { path: '/company/settings/profile', name: 'company-settings-profile', component: CompanySettingsProfile, meta: { title: 'Company Settings Profile - 1Punch' } },
    { path: '/company/settings/timelang', name: 'company-settings-timelang', component: CompanySettingsTimeLang, meta: { title: 'Company Settings Timezone and Language - 1Punch' } },
    { path: '/company/settings/users', name: 'company-settings-users', component: CompanySettingsUsers, meta: { title: 'Company Settings Users - 1Punch' } },
    { path: '/company/settings/users/add', name: 'company-settings-users-add', component: CompanySettingsUsersAdd, meta: { title: 'Company Settings Add User - 1Punch' } },
    { path: '/company/settings/users/add-multi', name: 'company-settings-users-add-multi', component: CompanySettingsUsersAddMulti, meta: { title: 'Company Settings Add Multiple Users - 1Punch' } },
    { path: '/company/settings/departments', name: 'company-settings-departments', component: CompanySettingsDepartments, meta: { title: 'Company Settings Departments - 1Punch' } },
    { path: '/company/settings/business-days', name: 'company-settings-business-days', component: CompanySettingsBusinessDays, meta: { title: 'Company Settings Business Days - 1Punch' } },
    { path: '/company/settings/holidays', name: 'company-settings-holidays', component: CompanySettingsHolidays, meta: { title: 'Company Settings Holidays - 1Punch' } },
    { path: '/company/settings/allowed-ips', name: 'company-settings-allowed-ips', component: CompanySettingsAllowedIPs, meta: { title: 'Company Settings Allowed IPs - 1Punch' } },
    { path: '/company/settings', redirect: '/company/settings/profile' },
    { path: '*', component: Error404 }
  ]
})
