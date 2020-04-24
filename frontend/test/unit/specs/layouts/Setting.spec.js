import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import Setting from '@/layouts/Setting'

const scopedSlots = {
  default: '<p class="default-scoped">Setting page</p>',
  sidebar: '<p class="sidebar-scoped">Setting side bar</p>'
}

Object.assign(wrapperOps, {
  scopedSlots
})

const wrapper = shallowMount(Setting, wrapperOps)

describe('Setting.vue', () => {
  it('should render Setting layout correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })
})
