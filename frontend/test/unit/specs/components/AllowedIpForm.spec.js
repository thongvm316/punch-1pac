import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import AllowedIpForm from '@/components/AllowedIpForm'

const localAddIp = jest.spyOn(AllowedIpForm.methods, 'localAddIp')
const createIP = jest.spyOn(AllowedIpForm.methods, 'createIP').mockResolvedValue()
const localEditIp = jest.spyOn(AllowedIpForm.methods, 'localEditIp')
const updateIP = jest.spyOn(AllowedIpForm.methods, 'updateIP').mockResolvedValue()
const handleSuccessFn = jest.spyOn(AllowedIpForm.mixins[1].methods, 'handleSuccess')

Object.assign(wrapperOps, {
  data() {
    return {
      params: '192.168.1.1'
    }
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
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when create allowedIP', () => {
    it('should call localAddIp method', async () => {
      setComputed(wrapper, {
        isDisabled: false
      })

      wrapper.find({ ref: 'createAllowedIpButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localAddIp).toHaveBeenCalled()
      expect(createIP).toHaveBeenCalledWith({ ip_address: '192.168.1.1' })
      expect(handleSuccessFn).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Allowed IP address is created' })
    })
  })

  describe('when update allowedIP', () => {
    beforeEach(async () => {
      wrapper.setProps({
        targetIp: {
          ip_address: '192.168.110.1',
          id: 1
        }
      })
      await wrapper.vm.$nextTick()
    })

    it('should display update allowed ip button', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call localEditIp method', () => {
      setComputed(wrapper, {
        isDisabled: false
      })
      wrapper.find({ ref: 'editAllowedIpButton' }).trigger('click')

      expect(localEditIp).toHaveBeenCalled()
      expect(updateIP).toHaveBeenCalledWith({ id: 1, ip_address: '192.168.1.1' })
      // expect(handleSuccessFn).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Allowed IP address is created' })
    })
  })
})
