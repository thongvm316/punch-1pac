import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'

import i18n from '@/locale'
import CompanySettingsSidebar from '@/components/CompanySettingsSidebar'

const wrapper = shallowMount(CompanySettingsSidebar, {
  i18n,
  localVue
})

describe('CompanySettingsSidebar.vue', () => {
  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
