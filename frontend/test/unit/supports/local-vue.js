import { createLocalVue } from '@vue/test-utils'

import Vuelidate from 'vuelidate'
import moment from '@/moment'
import authorization from '@/authorization'

import currentUser from '@/mixins/global/current-user'
import pageAuthorization from '@/mixins/global/page-authorization'

import '@/config/axios/dev'

const localVue = createLocalVue()

localVue.use(Vuelidate)

localVue.prototype.$moment = moment
localVue.prototype.$auth = authorization

localVue.mixin(currentUser)
localVue.mixin(pageAuthorization)

localVue.filter('moment_l', val => val)
localVue.filter('moment_ll', val => val)
localVue.filter('moment_lll', val => val)
localVue.filter('moment_llll', val => val)
localVue.filter('moment_activity', val => val)

export default localVue
