import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import MonthYearPicker from '@/components/MonthYearPicker'

const togglePicker = jest.spyOn(MonthYearPicker.methods, 'togglePicker')
const onInputDatepicker = jest.spyOn(MonthYearPicker.methods, 'onInputDatepicker')

const localWrapperOps = {
  ...wrapperOps,
  Datepicker: true,
  data () {
    return {
      month: '2020-01-03',
      isMonthPicker: true,
      isOpenMonthYearPicker: true
    }
  }
}

describe('MonthYearPicker.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MonthYearPicker, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when MonthYearPicker was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when methods', () => {
    it('should togglePicker was called', async () => {
      wrapper.find('.month-year-picker-result').trigger('click')
      await wrapper.vm.$nextTick()

      expect(togglePicker).toHaveBeenCalled()
    })

    it('should onInputDatepicker was called', async () => {
      const input = {
        date: '2020-01-03',
        type: 'month'
      }
      wrapper.vm.onInputDatepicker()
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')[0]).toEqual([input])
    })
  })
})
