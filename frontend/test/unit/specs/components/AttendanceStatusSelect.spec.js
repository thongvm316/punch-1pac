import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import AttendanceStatusSelect from '@/components/AttendanceStatusSelect'

const updateValue = jest.spyOn(AttendanceStatusSelect.methods, 'updateValue')
const scopedSlots= {
  placeholder: '<option>Attendance status</option>'
}

Object.assign(wrapperOps, {
  scopedSlots
})

describe('AttendanceStatusSelect.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AttendanceStatusSelect, wrapperOps)
    setComputed(wrapper, {
      meta: initialStatesData.meta
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when AttendanceStatusSelect was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper).toMatchSnapshot()
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
