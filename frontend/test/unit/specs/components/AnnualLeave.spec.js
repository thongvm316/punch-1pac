import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import AnnualLeaveForm from '@/components/AnnualLeaveForm'
import AnnualLeave from '@/components/AnnualLeave'
import Modal from '@/components/Modal'
import modal from '@/mixins/modal'

Object.assign(wrapperOps, { mixins: [modal] })

describe('AnnualLeave.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AnnualLeave, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when AnnualLeave was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })

    it('should render sub components', () => {
      expect(wrapper.find(AnnualLeaveForm).isVueInstance()).toBe(true)
      expect(wrapper.find(AnnualLeaveForm).exists()).toBe(true)
      expect(wrapper.find(Modal).isVueInstance()).toBe(true)
      expect(wrapper.find(Modal).exists()).toBe(true)
    })
  })

  describe('when click toggle add modal', () => {
    it('should call method', () => {
      const toggleAddModal = jest.fn()
      wrapper.setMethods({ toggleAddModal })
      wrapper.find('button').trigger('click')

      expect(toggleAddModal).toHaveBeenCalled()
    })
  })
})
