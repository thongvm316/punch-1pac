import { createLocalVue } from '@vue/test-utils'

import moment from '@/moment'
import authorization from '@/authorization'
import axios from 'axios'

import currentUser from '@/mixins/current-user'
import pageAuthorization from '@/mixins/page-authorization'

axios.defaults.baseURL = '/frontend/test/unit/supports/api'
axios.defaults.headers.common['Accept'] = 'application/json'

const localVue = createLocalVue()
localVue.prototype.$moment = moment
localVue.prototype.$auth = authorization
localVue.prototype.$axios = axios
localVue.mixin(currentUser)
localVue.mixin(pageAuthorization)
localVue.filter('moment_l', val => val)
localVue.filter('moment_lll', val => val)
localVue.filter('moment_llll', val => val)
localVue.filter('moment_activity', val => val)

export default localVue
