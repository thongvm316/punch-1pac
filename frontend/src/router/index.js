import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const appName = window.initialStates().meta.app_name

const lazyLoadRoute = pageName => {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${pageName}`)
}

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', name: 'dashboard', component: lazyLoadRoute('Dashboard'), meta: { title: `Dashboard - ${appName}` } },
    { path: '/attendances', name: 'attendances', component: lazyLoadRoute('Attendances'), meta: { title: `Attendances - ${appName}` } },
    { path: '/requests', name: 'requests', component: lazyLoadRoute('Requests'), meta: { title: `Requests - ${appName}` } },
    { path: '/groups/:id/requests', name: 'group-requests', component: lazyLoadRoute('GroupRequests'), meta: { title: `Group Requests - ${appName}` } },
    { path: '/groups/:id/attendances', name: 'group-attendances', component: lazyLoadRoute('GroupAttendances'), meta: { title: `Group Attendances - ${appName}` } },
    { path: '/groups/:id/report', name: 'group-report', component: lazyLoadRoute('GroupReport'), meta: { title: `Group Report - ${appName}` } },
    { path: '/groups/:id/users/:user_id/report', name: 'group-report-personal', component: lazyLoadRoute('GroupReportPersonal'), meta: { title: `Group Report Personal - ${appName}` } },
    { path: '/groups/:id/users', name: 'group', component: lazyLoadRoute('Group'), meta: { title: `Group - ${appName}` } },
    { path: '/groups/:id', redirect: '/groups/:id/users' },
    { path: '/groups', name: 'groups', component: lazyLoadRoute('Groups'), meta: { title: `Groups - ${appName}` } },
    { path: '/settings', name: 'user-settings', component: lazyLoadRoute('UserSettings'), meta: { title: `User Settings - ${appName}` } },
    { path: '/company/settings/profile', name: 'company-settings-profile', component: lazyLoadRoute('CompanySettingsProfile'), meta: { title: `Company Settings Profile - ${appName}` } },
    { path: '/company/settings/users', name: 'company-settings-users', component: lazyLoadRoute('CompanySettingsUsers'), meta: { title: `Company Settings Users - ${appName}` } },
    { path: '/company/settings/business-days', name: 'company-settings-business-days', component: lazyLoadRoute('CompanySettingsBusinessDays'), meta: { title: `Company Settings Business Days - ${appName}` } },
    { path: '/company/settings/holidays', name: 'company-settings-holidays', component: lazyLoadRoute('CompanySettingsHolidays'), meta: { title: `Company Settings Holidays - ${appName}` } },
    { path: '/company/settings/allowed-ips', name: 'company-settings-allowed-ips', component: lazyLoadRoute('CompanySettingsAllowedIPs'), meta: { title: `Company Settings Allowed IPs - ${appName}` } },
    { path: '/company/settings', redirect: '/company/settings/profile' },
    { path: '/404', name: 'error-404', component: lazyLoadRoute('Error404'), meta: { title: '404 Page not found' } },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
