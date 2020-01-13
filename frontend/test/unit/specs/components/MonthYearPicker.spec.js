import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import Datepicker from 'vuejs-datepicker'
import MonthYearPicker from '@/components/MonthYearPicker'

const togglePicker = jest.spyOn(MonthYearPicker.methods, 'togglePicker')
const onInputDatepicker = jest.spyOn(MonthYearPicker.methods, 'onInputDatepicker')

Object.assign(wrapperOps, {
  data: function() {
    return {
      month: '2020-01-03',
      isMonthPicker: true,
      isOpenMonthYearPicker: true
    }
  },
  methods: {
    togglePicker,
    onInputDatepicker
  }
})

describe('MonthYearPicker.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MonthYearPicker, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when MonthYearPicker was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render sub component', () => {
      expect(wrapper.find(Datepicker).exists()).toBeTruthy()
      expect(wrapper.find(Datepicker).isVueInstance()).toBeTruthy()
    })
  })

  describe('when monthFormat', () => {
    it('should render month format LLL', () => {
      expect(wrapper.vm.monthFormat).toEqual('Jan 2020')
    })

    it('should render month format YYYY', async () => {
      wrapper.setData({ isMonthPicker: false })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.monthFormat).toEqual('2020')
    })
  })

  describe('when methods', () => {
    it('should togglePicker was called', async () => {
      wrapper.find('.month-year-picker-result').trigger('click')
      await wrapper.vm.$nextTick()

      expect(togglePicker).toHaveBeenCalled()
      expect(wrapper.vm.isOpenMonthYearPicker).toEqual(false)
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
      expect(wrapper.vm.isOpenMonthYearPicker).toEqual(false)
    })
  })
})
