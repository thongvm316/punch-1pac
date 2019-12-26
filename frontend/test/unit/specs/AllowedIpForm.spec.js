import store from '@/store'
import i18n from '@/locale'
import AllowedIpForm from '@/components/AllowedIpForm'
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount(AllowedIpForm, {
  i18n,
  store,
  propsData: {
    targetIp: '192.168.110.1'
  }
})

describe('AllowedIpForm.vue', () => {
  it('should display create allowed ip button', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().targetIp).toBe('192.168.110.1')
    expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(false)
    expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(true)
  })
})
