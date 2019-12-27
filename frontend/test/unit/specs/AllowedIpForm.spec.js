import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import companyAllowedIPs from '@/store/modules/company-allowed-ips'
import i18n from '@/locale'
import AllowedIpForm from '@/components/AllowedIpForm'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AllowedIpForm.vue', () => {
  describe('Vue', () => {
    let initState
    let store
    let wrapper

    beforeEach(() => {
      initState = {
        state: {
          allowedIPs: ['192.168.1.0'],
          errors: { ip_address: ['cant be blank'] }
        }
      }

      Object.assign(companyAllowedIPs, initState)

      store = new Vuex.Store({
        modules: { companyAllowedIPs }
      })

      wrapper = shallowMount(AllowedIpForm, {
        i18n,
        store,
        localVue
      })
    })

    describe('should mount AllowedIpForm Component', () => {
      it('should display AllowedIpForm Component', () => {
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('created && edit allowed ip button', () => {
      it('should display create allowed ip button', () => {
        expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(true)
        expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(false)
      })

      it('should display update allowed ip button', async () => {
        wrapper.setProps({ targetIp: '192.168.110.1' })
        await wrapper.vm.$nextTick()

        expect(wrapper.props().targetIp).toBe('192.168.110.1')
        expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(false)
        expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(true)
      })
    })
  })

  describe('Vuex in Component', () => {
    describe('form input hint text', () => {
      it('should un-display error text', () => {
        expect(wrapper.find({ ref: 'text-error' }).exists()).toBe(false)
      })

      it('should display error text', () => {
        console.log(store.state.companyAllowedIPs.errors.ip_address)
        expect(store.state.companyAllowedIPs.errors.ip_address).toEqual(['cant be blank'])
      })
    })
  })
})
