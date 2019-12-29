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

const localAddIp  = jest.fn()
const localEditIp = jest.fn()

const wrapper = shallowMount(AllowedIpForm, {
  i18n,
  store,
  methods: {
    localAddIp,
    localEditIp
  },
  localVue
})

describe('AllowedIpForm.vue', () => {
  describe('when AllowedIpForm was mounted', () => {
    it('should display AllowedIpForm Component', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('validation prop data', () => {
    const { targetIp } = wrapper.vm.$options.props

    expect(targetIp.required).toBeFalsy()
    expect(targetIp.type).toBe(String)
  })

  describe('create allowed ip button', () => {
    it('should display create allowed ip button', () => {
      expect(wrapper.vm.$data.params).toBe('')
      expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(true)
      expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(false)
    })

    it('should call localAddIp method', async () => {
      wrapper.find({ ref: 'createAllowedIpButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localAddIp).toHaveBeenCalled()
    })
  })

  describe('update allowed ip button', () => {
    beforeEach(async () => {
      wrapper.setProps({ targetIp: '192.168.110.1' })
      await wrapper.vm.$nextTick()
    })

    it('should display update allowed ip button', () => {
      expect(wrapper.props().targetIp).toEqual('192.168.110.1')
      expect(wrapper.find({ ref: 'createAllowedIpButton' }).exists()).toBe(false)
      expect(wrapper.find({ ref: 'editAllowedIpButton' }).exists()).toBe(true)
    })

    it('should call localEditIp method', () => {
      wrapper.find({ ref: 'editAllowedIpButton' }).trigger('click')

      expect(localEditIp).toHaveBeenCalled()
    })
  })

  describe('form input hint text', () => {
    it('should no display error text', () => {
      expect(wrapper.find('.form-group > .form-input-hint').exists()).toBe(false)
    })

    it('should display error text', async () => {
      wrapper.setData({ errors: { ip_address: ['cant be blank'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.form-group:first-of-type').classes()).toContain('has-error')
      expect(wrapper.find('.form-group > .form-input-hint').exists()).toBe(true)
      expect(wrapper.find('.form-group > .form-input-hint').text()).toEqual('IP address cant be blank')
    })
  })
})
