import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import Flash from '@/components/Flash'

describe('Flash.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Flash, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Flash was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should not have flash message', () => {
      expect(wrapper.find('.toast').exists()).toBe(false)
    })
  })

  describe('when have flash message', () => {
    it('should render success message', async () => {
      setComputed(wrapper, {
        message: 'Success Message', type: 'success'
      })
      await wrapper.vm.$nextTick()
      const toastEl = wrapper.find('.toast')

      expect(toastEl.exists()).toBe(true)
      expect(toastEl.classes()).toContain('toast-success')
      expect(toastEl.text()).toEqual('Success Message')
    })

    it('should render error message', async () => {
      setComputed(wrapper, {
        message: 'Error Message', type: 'error'
      })
      await wrapper.vm.$nextTick()
      const toastEl = wrapper.find('.toast')

      expect(toastEl.exists()).toBe(true)
      expect(toastEl.classes()).toContain('toast-error')
      expect(toastEl.text()).toEqual('Error Message')
    })
  })
})
