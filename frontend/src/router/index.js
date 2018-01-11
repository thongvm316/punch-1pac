import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../views/Dashboard'
import Attendance from '../views/Attendance'
import Requests from '../views/Requests'
import Request from '../views/Request'
import Groups from '../views/Groups'
import Group from '../views/Group'

import Announcements from '../views/Announcements'
import Announcement from '../views/Announcement'
import Settings from '../views/Settings.vue'
import Company from '../views/Company.vue'

import Error404 from '../views/Error404'

import Modules from '../views/Modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/modules', name: 'modules', component: Modules },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/attendance', name: 'attendance', component: Attendance },
    { path: '/requests/:id', name: 'requests', component: Request },
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
