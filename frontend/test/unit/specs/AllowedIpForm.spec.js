import { shallowMount } from '@vue/test-utils'

import store from '@/store'
import i18n from '@/locale'
import AllowedIpForm from '@/components/AllowedIpForm'

const wrapper = shallowMount(AllowedIpForm, {
  i18n,
  store
})

describe('AllowedIpForm.vue', () => {
  it('should display AllowedIpForm Component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display create allowed ip button', () => {
    expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(true)
    expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(false)
  })

  it('should display update allowed ip button', async () => {
    wrapper.setProps({ targetIp: '192.168.110.1' })
    await wrapper.vm.$forceUpdate()

    expect(wrapper.props().targetIp).toBe('192.168.110.1')
    expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(false)
    expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(true)
  })
})
