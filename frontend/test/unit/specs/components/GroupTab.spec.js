import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import GroupTab from '@/components/GroupTab'

const propsData = {
  groupId: '1'
}

Object.assign(wrapperOps, { propsData })

describe('GroupTab.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupTab, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupTab was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
})
