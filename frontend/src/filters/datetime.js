import Vue from 'vue'
import moment from '../moment'

Vue.filter('datetime_short', val => moment(val).format('MMM D, hh:mm'))
Vue.filter('datetime_normal', val => moment(val).format('MMM DD YYYY, HH:mm'))
Vue.filter('datetime_mmdd', val => moment(val).format('MMM DD'))
