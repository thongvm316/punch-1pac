import Vue from 'vue'
import moment from '../moment'

Vue.filter('datetime_short', val => moment(val).format('LLL'))
Vue.filter('datetime_normal', val => moment(val).format('LLLL'))
Vue.filter('datetime_mmdd', val => moment(val).format('L'))
