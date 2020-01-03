import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'

import i18n from '@/locale'
import ConfirmDialog from '@/components/ConfirmDialog'

const propsData = {
  title: 'Confirm Dialog',
  modalOpen: false
}

const toggle = jest.spyOn(ConfirmDialog.methods, 'toggle')
const methods = {
  toggle,
  confirm: jest.fn()
}

const scopedSlots = {
  default: '<p class="default-scoped">Scope slot</p>',
  confirmBtn: '<p class="confirm-btn-scoped">Confirm Btn Slot</p>'
}

describe('ConfirmDialog.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ConfirmDialog, {
      i18n,
      propsData,
      methods,
      scopedSlots,
      localVue
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when ConfirmDialog was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render correct props data', () => {
      const { title, modalOpen } = wrapper.vm.$props

      expect(title).toEqual('Confirm Dialog')
      expect(wrapper.find('.modal-title').text()).toEqual('Confirm Dialog')
      expect(modalOpen).toEqual(false)
      expect(wrapper.find('.modal').classes()).not.toContain('active')
    })

    it('should render slot', () => {
      expect(wrapper.find('p.default-scoped').exists()).toBe(true)
      expect(wrapper.find('.modal-footer .confirm-btn-scoped').exists()).toBe(true)
    })
  })

  describe('when validation propsData', () => {
    it('should validate prop data', () => {
      const { title, modalOpen, deleteObject, objectId } = wrapper.vm.$options.props

      expect(title.required).toBeTruthy()
      expect(title.type).toBe(String)
      expect(modalOpen.required).toBeTruthy()
      expect(modalOpen.type).toBe(Boolean)
      expect(deleteObject.type).toBe(Function)
      expect(objectId.type).toBe(Number)
    })
  })

  describe('when methods confirm dialog', () => {
    beforeEach(async () => {
      wrapper.setProps({ modalOpen: true })
      await wrapper.vm.$nextTick()
    })

    it('should toggle method is called', () => {
      wrapper.find('.modal-overlay').trigger('click')

      expect(toggle).toHaveBeenCalled()
      expect(wrapper.vm.open).toBe(false)
      expect(wrapper.emitted('update:modalOpen')).toBeTruthy()
      expect(wrapper.emitted('update:modalOpen')).toHaveLength(1)
      expect(wrapper.emitted('update:modalOpen')[0]).toEqual([false])
    })
  })

  describe('when watcher modalOpen', () => {
    it('should open dialog when props change', async () => {
      expect(wrapper.vm.open).toBe(false)

      wrapper.setProps({ modalOpen: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.open).toBe(true)
    })
  })
})
