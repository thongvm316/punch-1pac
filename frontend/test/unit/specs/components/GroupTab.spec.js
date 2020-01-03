import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'

import router from '@/router'
import i18n from '@/locale'

import GroupTab from '@/components/GroupTab'

describe('GroupTab.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupTab, {
      i18n,
      router,
      localVue
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupTab was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
})
