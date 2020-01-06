import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import Flash from '@/components/Flash'
import Announcements from '@/components/Announcements'
import RemindPunchIn from '@/components/RemindPunchIn'
import PopupChangePassword from '@/components/PopupChangePassword'
import Main from '@/layouts/Main'

const scopedSlots = {
  default: '<p class="default-scoped">Dashboard page</p>'
}

Object.assign(wrapperOps, {
  propsData: {
    title: 'Dashboard'
  },
  scopedSlots
})

const wrapper = shallowMount(Main, wrapperOps)

describe('Main.vue', () => {
  it('should render Main layout correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have slot', () => {
    expect(wrapper.find('.default-scoped').exists()).toBeTruthy()
  })

  it('should have child component', () => {
    expect(wrapper.find(AppHeader).exists()).toBeTruthy()
    expect(wrapper.find(AppFooter).exists()).toBeTruthy()
    expect(wrapper.find(Flash).exists()).toBeTruthy()
    expect(wrapper.find(Announcements).exists()).toBeTruthy()
    expect(wrapper.find(RemindPunchIn).exists()).toBeTruthy()
    expect(wrapper.find(PopupChangePassword).exists()).toBeTruthy()
  })
})
