import Vue from 'vue'
import moment from '../moment'

Vue.filter('moment_l', val => moment(val).format('L'))
Vue.filter('moment_ll', val => moment(val).format('LL'))
Vue.filter('moment_lll', val => moment(val).format('LLL'))
Vue.filter('moment_llll', val => moment(val).format('LLLL'))
