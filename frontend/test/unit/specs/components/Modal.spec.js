import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import Modal from '@/components/Modal'

const propsData = {
  title: 'Title',
  modalOpen: false
}
const scopedSlots = {
  default: '<p class="default-slot">Default slot</p>'
}
const toggle = jest.spyOn(Modal.methods, 'toggle')

Object.assign(wrapperOps, {
  propsData,
  methods: { toggle },
  scopedSlots,
})

describe('Modal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Modal, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Modal was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should data equal props', () => {
      const { title, modalOpen } = wrapper.vm.$options.props

      expect(wrapper.vm.titleModal).toEqual('Title')
      expect(wrapper.vm.open).toEqual(false)
      expect(wrapper.find('.modal').classes()).not.toContain('active')
      expect(wrapper.find('.modal .modal-title').text()).toEqual('Title')
    })

    it('should have slot', () => {
      expect(wrapper.find('.default-slot').exists()).toBeTruthy()
    })
  })

  describe('when props data was changed', () => {
    it('should change data', async () => {
      const newProps = {
        title: 'New title',
        modalOpen: true
      }
      wrapper.setProps({ title: newProps.title, modalOpen: newProps.modalOpen })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.titleModal).toEqual('New title')
      expect(wrapper.vm.open).toEqual(true)
      expect(wrapper.find('.modal').classes()).toContain('active')
      expect(wrapper.find('.modal .modal-title').text()).toEqual('New title')
    })
  })

  describe('when toggle method', () => {
    it('should toggle method was called', async () => {
      const newProps = {
        modalOpen: true
      }
      wrapper.setProps({ modalOpen: newProps.modalOpen })
      await wrapper.vm.$nextTick()
      wrapper.find('.modal .modal-overlay').trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggle).toHaveBeenCalled()
      expect(wrapper.vm.open).toEqual(false)
      expect(wrapper.find('.modal').classes()).not.toContain('active')
      expect(wrapper.emitted('update:modalOpen')).toBeTruthy()
      expect(wrapper.emitted('update:modalOpen')[0]).toEqual([false])
    })
  })
})
