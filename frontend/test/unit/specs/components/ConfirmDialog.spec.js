import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import ConfirmDialog from '@/components/ConfirmDialog'

const propsData = {
  title: 'Confirm Dialog',
  modalOpen: false,
  objectId: 0,
  deleteObject: jest.fn().mockResolvedValue(null)
}

const toggle = jest.spyOn(ConfirmDialog.methods, 'toggle')
const confirm = jest.spyOn(ConfirmDialog.methods, 'confirm')

const scopedSlots = {
  default: '<p class="default-scoped">Scope slot</p>',
  // confirmBtn: '<button class="confirm-btn-scoped">Confirm Btn Slot</button>'
}

const localWrapperOps = {
  ...wrapperOps,
  propsData,
  scopedSlots
}

describe('ConfirmDialog.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ConfirmDialog, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when ConfirmDialog was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when watch modalOpen', () => {
    it('should active modal', async () => {
      wrapper.setProps({ modalOpen: true })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when methods', () => {
    beforeEach(async () => {
      wrapper.setProps({ modalOpen: true })
      await wrapper.vm.$nextTick()
    })

    it('should toggle haveBeebCalled', () => {
      wrapper.find('.modal-overlay').trigger('click')

      expect(toggle).toHaveBeenCalled()
      expect(wrapper.emitted('update:modalOpen')).toHaveLength(1)
      expect(wrapper.emitted('update:modalOpen')[0]).toEqual([false])
    })

    it('should confirm toHaveBeenCalled', async () => {
      wrapper.find('.modal-footer .btn-error').trigger('click')
      await wrapper.vm.$nextTick()

      expect(confirm).toHaveBeenCalled()
      expect(wrapper.vm.deleteObject).toHaveBeenCalledWith(0)
      expect(wrapper.emitted('update:modalOpen')).toHaveLength(1)
      expect(wrapper.emitted('update:modalOpen')[0]).toEqual([false])
    })
  })
})
