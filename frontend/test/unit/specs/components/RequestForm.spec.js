import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '@/mixins/flatpickr-locale'
import handleSuccess from '@/mixins/handle-success'
import RequestForm from '@/components/RequestForm'

const localAddRequest = jest.fn()
const localEditRequest = jest.fn()
const attendance = {
  day: '2019-12-02',
  attended_at: '08:00',
  left_at: '18:00'
}
const request = {
  attendance_day: '2019-12-02',
  attended_at: '08:00',
  left_at: '18:00',
  reason: 'Forgot'
}

describe('RequestForm.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when attendance props', () => {
    beforeEach(() => {
      Object.assign(wrapperOps, {
        methods: {
          localAddRequest,
          localEditRequest
        },
        mixins: [flatpickrLocale, handleSuccess],
        propsData: { attendance }
      })

      wrapper = shallowMount(RequestForm, wrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.find(flatPickr).exists()).toBeTruthy()
    })

    it('should have correct params', () => {
      expect(wrapper.vm.day).toEqual(attendance.day)
      expect(wrapper.vm.params.attendance_day).toEqual(attendance.day)
      expect(wrapper.vm.params.attended_at).toEqual(attendance.attended_at)
      expect(wrapper.vm.params.left_at).toEqual(attendance.left_at)
      expect(wrapper.vm.params.reason).toEqual('')
    })

    it('should have localAddRequest button', () => {
      expect(wrapper.findAll('.form-group button')).toHaveLength(1)
      expect(wrapper.find({ ref: 'localAddRequestButton' }).exists()).toBeTruthy()
    })

    it('should localAddRequest called', () => {
      wrapper.find({ ref: 'localAddRequestButton' }).trigger('click')

      expect(localAddRequest).toHaveBeenCalled()
    })
  })

  describe('when request props', () => {
    beforeEach(() => {
      Object.assign(wrapperOps, {
        methods: {
          localAddRequest,
          localEditRequest
        },
        mixins: [flatpickrLocale, handleSuccess],
        propsData: { request }
      })

      wrapper = shallowMount(RequestForm, wrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.find(flatPickr).exists()).toBeTruthy()
    })

    it('should have correct params', () => {
      expect(wrapper.vm.day).toEqual(request.attendance_day)
      expect(wrapper.vm.params.attendance_day).toEqual(request.attendance_day)
      expect(wrapper.vm.params.attended_at).toEqual(request.attended_at)
      expect(wrapper.vm.params.left_at).toEqual(request.left_at)
      expect(wrapper.vm.params.reason).toEqual(request.reason)
    })

    it('should have localEditRequest button', () => {
      expect(wrapper.findAll('.form-group button')).toHaveLength(1)
      expect(wrapper.find({ ref: 'localEditRequestButton' }).exists()).toBeTruthy()
    })

    it('should localEditRequest called', () => {
      wrapper.find({ ref: 'localEditRequestButton' }).trigger('click')

      expect(localEditRequest).toHaveBeenCalled()
    })
  })
})
