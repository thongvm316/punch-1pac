import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../pages/Dashboard'
import Attendances from '../pages/Attendances'
import Requests from '../pages/Requests'
import Request from '../pages/Request'
import Groups from '../pages/Groups'
import Group from '../pages/Group'

import Announcements from '../pages/Announcements'
import Announcement from '../pages/Announcement'
import Settings from '../pages/Settings.vue'
import Company from '../pages/Company.vue'

import Error404 from '../pages/Error404'

import Modules from '../pages/Modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/modules', name: 'modules', component: Modules },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/attendances', name: 'attendance', component: Attendances },
    { path: '/requests/:id', name: 'request', component: Request },
    { path: '/requests', name: 'requests', component: Requests },
    { path: '/groups/:id', name: 'group', component: Group },
    { path: '/groups', name: 'groups', component: Groups },
    { path: '/announcements/:id', name: 'announcement', component: Announcement },
    { path: '/announcements', name: 'announcements', component: Announcements },
    { path: '/settings', name: 'settings', component: Settings },
    { path: '/company', name: 'company', component: Company },
    { path: '*', component: Error404 }
  ]
})
