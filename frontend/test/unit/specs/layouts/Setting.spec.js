import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CompanySettingsSidebar from '@/components/CompanySettingsSidebar.vue'
import UserSettingsSidebar from '@/components/UserSettingsSidebar.vue'
import Flash from '@/components/Flash.vue'
import PopupChangePassword from '@/components/PopupChangePassword'
import Setting from '@/layouts/Setting'

const scopedSlots = {
  default: '<p class="default-scoped">Setting page</p>'
}

describe('Setting.vue', () => {
  describe('when sidebarType is company', () => {
    let wrapper

    beforeEach(() => {
      Object.assign(wrapperOps, {
        propsData: {
          sidebarType: 'company',
          subtitle: 'Setting'
        },
        scopedSlots
      })

      wrapper = shallowMount(Setting, wrapperOps)
    })

    afterEach(() => { wrapper.vm.$destroy() })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should have slot', () => {
      expect(wrapper.find('.default-scoped').exists()).toBeTruthy()
    })

    it('should have child components', () => {
      expect(wrapper.find(AppHeader).exists()).toBeTruthy()
      expect(wrapper.find(AppFooter).exists()).toBeTruthy()
      expect(wrapper.find(CompanySettingsSidebar).exists()).toBeTruthy()
      expect(wrapper.find(Flash).exists()).toBeTruthy()
      expect(wrapper.find(PopupChangePassword).exists()).toBeTruthy()
    })
  })

  describe('when sidebarType is company', () => {
    let wrapper

    beforeEach(() => {
      Object.assign(wrapperOps, {
        propsData: {
          sidebarType: 'user',
          subtitle: 'Setting'
        },
        scopedSlots
      })

      wrapper = shallowMount(Setting, wrapperOps)
    })

    afterEach(() => { wrapper.vm.$destroy() })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should have slot', () => {
      expect(wrapper.find('.default-scoped').exists()).toBeTruthy()
    })

    it('should have child components', () => {
      expect(wrapper.find(AppHeader).exists()).toBeTruthy()
      expect(wrapper.find(AppFooter).exists()).toBeTruthy()
      expect(wrapper.find(UserSettingsSidebar).exists()).toBeTruthy()
      expect(wrapper.find(Flash).exists()).toBeTruthy()
      expect(wrapper.find(PopupChangePassword).exists()).toBeTruthy()
    })
  })
})
