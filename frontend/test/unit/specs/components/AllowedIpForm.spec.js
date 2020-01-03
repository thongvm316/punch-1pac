import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import AllowedIpForm from '@/components/AllowedIpForm'

const localAddIp = jest.fn()
const localEditIp = jest.fn()
const handleSuccess = jest.spyOn(AllowedIpForm.methods, 'handleSuccess')

Object.assign(wrapperOps, {
  methods: {
    localAddIp,
    localEditIp,
    handleSuccess
  }
})

describe('AllowedIpForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AllowedIpForm, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when AllowedIpForm was mounted', () => {
    it('should display AllowedIpForm Component', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })
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

  describe('when handleSuccess method', () => {
    it('should createSuccess', async () => {
      wrapper.vm.handleSuccess()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isDisable).toEqual(false)
      expect(wrapper.emitted('afterModify')).toBeTruthy()
    })
  })

  describe('form input hint text', () => {
    it('should no display error text', () => {
      expect(wrapper.find('.form-group > .form-input-hint').exists()).toBe(false)
    })

    it('should display error text', async () => {
      setComputed(wrapper, { errors: { ip_address: ['cant be blank'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.form-group:first-of-type').classes()).toContain('has-error')
      expect(wrapper.find('.form-group > .form-input-hint').exists()).toBe(true)
      expect(wrapper.find('.form-group > .form-input-hint').text()).toEqual('IP address cant be blank')
    })
  })
})
