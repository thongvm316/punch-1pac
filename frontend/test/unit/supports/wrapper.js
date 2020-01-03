import localVue from './local-vue'

import store from '@/store'
import router from '@/router'
import i18n from '@/locale'

const wrapperOps = {
  i18n,
  store,
  router,
  localVue
}

export default wrapperOps
