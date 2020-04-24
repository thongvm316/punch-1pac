import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import Modal from '@/components/Modal'

const propsData = {
  title: 'Title',
  modalOpen: true
}
const scopedSlots = {
  default: '<p class="default-slot">Modal content</p>'
}
const toggle = jest.spyOn(Modal.methods, 'toggle')

const localWrapperOps = {
  ...wrapperOps,
  propsData,
  scopedSlots
}

describe('Modal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Modal, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Modal was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when props data was changed', () => {
    it('should change data', async () => {
      const newProps = {
        title: 'New title',
        modalOpen: false
      }
      wrapper.setProps({
        title: newProps.title,
        modalOpen: newProps.modalOpen
      })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when toggle method', () => {
    it('should toggle method was called', async () => {
      wrapper.find('.modal .modal-overlay').trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggle).toHaveBeenCalled()
      expect(wrapper.vm.open).toEqual(false)
      expect(wrapper.emitted('update:modalOpen')).toBeTruthy()
      expect(wrapper.emitted('update:modalOpen')[0]).toEqual([false])
    })
  })
})
