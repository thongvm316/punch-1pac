import Vue from 'vue'
import Router from 'vue-router'

import Modules from '../views/Modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/modules', name: 'modules', component: Modules },
    { path: '/' }
  ]
})
