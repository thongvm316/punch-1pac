import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import AnnualLeave from '@/components/AnnualLeave'

const toggleAddModal = jest.spyOn(AnnualLeave.mixins[0].methods, 'toggleAddModal')

Object.assign(wrapperOps, {
  stubs: {
    Modal: true,
    AnnualLeaveForm: true
  }
})

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
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when click toggle add modal', () => {
    it('should call method', async () => {
      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick

      expect(toggleAddModal).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
