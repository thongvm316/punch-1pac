import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import companyAllowedIPs from '@/store/modules/company-allowed-ips'
import i18n from '@/locale'
import AllowedIpForm from '@/components/AllowedIpForm'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: { companyAllowedIPs }
})

const wrapper = shallowMount(AllowedIpForm, {
  i18n,
  store,
  localVue
})

describe('AllowedIpForm.vue', () => {
  describe('should mount AllowedIpForm Component', () => {
    it('should display AllowedIpForm Component', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('created && edit allowed ip button', () => {
    it('should display create allowed ip button', () => {
      expect(wrapper.vm.$data.params).toBe('')
      expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(true)
      expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(false)
    })

    it('should display update allowed ip button', async () => {
      wrapper.setProps({ targetIp: '192.168.110.1' })
      await wrapper.vm.$nextTick()

      expect(wrapper.props().targetIp).toEqual('192.168.110.1')
      expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(false)
      expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(true)
    })
  })

  describe('form input hint text', () => {
    it('should no display error text', () => {
      expect(wrapper.find({ ref: 'text-error' }).exists()).toBe(false)
    })

    it('should display error text', async () => {
      wrapper.setData({ errors: { ip_address: ['cant be blank'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper.find({ ref: 'text-error' }).exists()).toBe(true)
    })
  })
})
