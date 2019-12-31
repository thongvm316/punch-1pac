import { shallowMount, createLocalVue } from '@vue/test-utils'

import store from '@/store'
import i18n from '@/locale'
import AttendanceStatusSelect from '@/components/AttendanceStatusSelect'

import setComputed from '../../util/set-computed'

const localVue = createLocalVue()
const updateValue = jest.spyOn(AttendanceStatusSelect.methods, 'updateValue')

describe('AttendanceStatusSelect.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AttendanceStatusSelect, {
      store,
      i18n,
      methods: { updateValue },
      localVue
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when AttendanceStatusSelect was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.isVueInstance()).toBe(true)
    })
  })

  describe('when computed meta data', () => {
    it('should render options for form-select', () => {
      const attendance_statuses = ['attend_ok', 'attend_late', 'leave_ok', 'leave_early', 'annual_leave']
      setComputed(wrapper, { meta: { attendance_statuses } })

      expect(wrapper.find('.form-select option').exists()).toBe(true)
      expect(wrapper.findAll('.form-select option')).toHaveLength(5)
    })
  })

  describe('when onChange method', () => {
    it('should call onChange method', () => {
      wrapper.find('select.form-select').trigger('change')

      expect(updateValue).toHaveBeenCalled()
      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input).toHaveLength(1)
    })

    it('should emtting correctly data', () => {
      wrapper.vm.$emit('input', 'attend_ok')

      expect(wrapper.emitted().input[0]).toEqual(['attend_ok'])
    })
  })
})
