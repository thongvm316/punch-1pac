import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import CompanySettingsSidebar from '@/components/CompanySettingsSidebar'

const wrapper = shallowMount(CompanySettingsSidebar, wrapperOps)

describe('CompanySettingsSidebar.vue', () => {
  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
