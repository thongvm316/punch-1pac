import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import { fakeFebAttendances } from '../../supports/api/calendar'

import Datepicker from 'vuejs-datepicker'
import MainLayout from '@/layouts/Main'
import AttendanceStatusSelect from '@/components/AttendanceStatusSelect'
import RequestForm from '@/components/RequestForm'
import Modal from '@/components/Modal.vue'
import Attendances from '@/pages/Attendances'

const onInputDatepicker = jest.spyOn(Attendances.methods, 'onInputDatepicker')
const getAttendances = jest.fn()
const toggleAddModal = jest.spyOn(Attendances.methods, 'toggleAddModal')

describe('Attendances.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Attendances, {
      ...wrapperOps,
      computed: {
        formattedAttendances() { return fakeFebAttendances.data.attendances }
      },
      methods: {
        onInputDatepicker,
        getAttendances,
        toggleAddModal
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Attendances mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(Datepicker).exists()).toBeTruthy()
      expect(wrapper.find(MainLayout).exists()).toBeTruthy()
      expect(wrapper.find(AttendanceStatusSelect).exists()).toBeTruthy()
      expect(wrapper.find(Modal).exists()).toBeTruthy()
    })

    it('should call getAttendances', () => {
      expect(getAttendances).toHaveBeenCalledTimes(1)
    })

    describe('when click Add Request btn on first record', () => {
      beforeEach(async () => {
        wrapper.find('tbody .btn-action').trigger('click')
        await wrapper.vm.$nextTick()
      })

      it('should show RequestForm', () => {
        expect(wrapper.vm.isAddModalOpen).toBeTruthy()
        expect(wrapper.find(RequestForm).exists()).toBeTruthy()
      })

      it('should call toggleAddModal with correct props', () => {
        expect(toggleAddModal).toHaveBeenCalledWith(fakeFebAttendances.data.attendances[0])
      })

      it('should update data attendances correctly', () => {
        expect(wrapper.vm.attendance).toEqual(fakeFebAttendances.data.attendances[0])
      })
    })
  })

  describe('when select date in DatePicker', () => {
    const mockDateData = 'Jan 01, 2020'

    beforeEach(async () => {
      wrapper.find(Datepicker).vm.$emit('input', mockDateData)
      await wrapper.vm.$nextTick()
    })

    it('should call onInputDatepicker', () => {
      expect(onInputDatepicker).toHaveBeenCalled()
    })

    it('should change params date data', () => {
      expect(wrapper.vm.params.date).toBe(wrapper.vm.$moment(mockDateData).format('YYYY-MM-DD'))
    })

    it('should call getAttendances', () => {
      expect(getAttendances).toHaveBeenCalledTimes(2)
    })
  })

  describe('when select status in AttendanceStatusSelect', () => {
    const mockStatusData = 'attend_late'

    beforeEach(async () => {
      wrapper.find(AttendanceStatusSelect).vm.$emit('input', mockStatusData)
      await wrapper.vm.$nextTick()
    })

    it('should change params status data', () => {
      expect(wrapper.vm.params.status).toBe(mockStatusData)
    })

    it('should call getAttendances', () => {
      expect(getAttendances).toHaveBeenCalledTimes(2)
    })
  })
})
