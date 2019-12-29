import { shallowMount, createLocalVue } from '@vue/test-utils'

import i18n from '@/locale'
import AnnualLeaveForm from '@/components/AnnualLeaveForm'
import AnnualLeave from '@/components/AnnualLeave'
import Modal from '@/components/Modal'
import modal from '@/mixins/modal'

const localVue = createLocalVue()

const wrapper = shallowMount(AnnualLeave, {
  i18n,
  mixins: [modal],
  localVue
})

describe('AnnualLeave.vue', () => {
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
    const toggleAddModal = jest.fn()
    wrapper.setMethods({ toggleAddModal })
    wrapper.find('button').trigger('click')

    expect(toggleAddModal).toHaveBeenCalled()
  })
})
