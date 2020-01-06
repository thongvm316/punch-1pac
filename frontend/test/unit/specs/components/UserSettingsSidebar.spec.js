import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import UserSettingsSidebar from '@/components/UserSettingsSidebar'

const wrapper = shallowMount(UserSettingsSidebar, wrapperOps)
describe('UserSettingsSidebar.vue', () => {
  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
