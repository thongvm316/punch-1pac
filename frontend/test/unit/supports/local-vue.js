import { createLocalVue } from '@vue/test-utils'

import moment from '@/moment'
import authorization from '@/authorization'

import currentUser from '@/mixins/current-user'
import pageAuthorization from '@/mixins/page-authorization'

const localVue = createLocalVue()
localVue.prototype.$moment = moment
localVue.prototype.$auth = authorization
localVue.mixin(currentUser)
localVue.mixin(pageAuthorization)

export default localVue
