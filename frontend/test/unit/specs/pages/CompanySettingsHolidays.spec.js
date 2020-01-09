import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import { holidaysData } from '../store/api-data/holidays.api'

import Datepicker from 'vuejs-datepicker'
import SettingLayout from '@/layouts/Setting'
import HolidayForm from '@/components/HolidayForm'
import CompanySettingsHolidays from '@/pages/CompanySettingsHolidays'
import Modal from '@/components/Modal.vue'

const fakeHolidaysData = holidaysData()
const onInputDatepicker = jest.spyOn(CompanySettingsHolidays.methods, 'onInputDatepicker')
const toggleAddModal = jest.spyOn(CompanySettingsHolidays.methods, 'toggleAddModal')
const toggleUpdateModal = jest.spyOn(CompanySettingsHolidays.methods, 'toggleUpdateModal')
const importHolidays = jest.spyOn(CompanySettingsHolidays.methods, 'importHolidays')
const importNationalHolidays = jest.fn().mockResolvedValue(fakeHolidaysData)
const setFlashMsg = jest.fn()
const deleteHoliday = jest.fn()
const fetchHolidays = jest.fn()
const filterHolidays = jest.fn().mockImplementation(state => query => {
  return fakeHolidaysData
})

describe('CompanySettingsHolidays.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsHolidays, {
      ...wrapperOps,
      methods: {
        onInputDatepicker,
        toggleAddModal,
        toggleUpdateModal,
        importNationalHolidays,
        setFlashMsg,
        fetchHolidays,
        importHolidays,
        deleteHoliday
      },
      computed: {
        filterHolidays
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsHolidays mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
      expect(wrapper.find(Datepicker).exists()).toBeTruthy()
      expect(wrapper.find(Modal).exists()).toBeTruthy()
    })

    it('should call fetchHolidays', () => {
      expect(fetchHolidays).toHaveBeenCalled()
    })
  })

  describe('when click importHolidayBtn', () => {
    const country = 'vietnam'

    it('should call importHolidays with selected country', async () => {
      wrapper.setData({ country })
      wrapper.find({ ref: 'importHolidayBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(importHolidays).toHaveBeenCalled()
      expect(importNationalHolidays).toHaveBeenCalledWith(country)
    })
  })

  describe('when change year in datepicker', () => {
    const mockYearData = '2021'
    it('should call fetchHolidays with right year arg', async () => {
      wrapper.find(Datepicker).vm.$emit('input', mockYearData)
      await wrapper.vm.$nextTick()

      expect(fetchHolidays).toHaveBeenCalledWith(mockYearData)
    })
  })

  describe('when click Add Holiday btn', () => {
    beforeEach(async () => {
      wrapper.find({ref: 'btnAddHoliday'}).trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should call toggleAddModal', () => {
      expect(toggleAddModal).toHaveBeenCalled()
    })

    it('should show modal with HolidayForm', () => {
      expect(wrapper.find(HolidayForm).exists()).toBeTruthy()
      expect(wrapper.vm.isAddModalOpen).toBeTruthy()
    })

    it('should hide modal with HolidayForm after submited', async () => {
      wrapper.find(HolidayForm).vm.$emit('afterModify')
      await wrapper.vm.$nextTick()

      expect(wrapper.find(HolidayForm).exists()).toBeFalsy()
      expect(wrapper.vm.isAddModalOpen).toBeFalsy()
    })
  })

  describe('when click edit holiday on the first record', () => {
    beforeEach(async () => {
      wrapper.find('tbody tr:first-child button:first-child').trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should call toggleUpdateModal', () => {
      expect(toggleUpdateModal).toHaveBeenCalledWith(fakeHolidaysData[0])
    })

    it('should show modal with HolidayForm', () => {
      expect(wrapper.find(HolidayForm).exists()).toBeTruthy()
      expect(wrapper.vm.isEditModalOpen).toBeTruthy()
    })

    it('should hide modal with HolidayForm after submited', async () => {
      wrapper.find(HolidayForm).vm.$emit('afterModify')
      await wrapper.vm.$nextTick()

      expect(wrapper.find(HolidayForm).exists()).toBeFalsy()
      expect(wrapper.vm.isEditModalOpen).toBeFalsy()
    })
  })

  describe('when click delete holiday on the first record', () => {
    it('should call deleteHoliday with right id argument', async () => {
      wrapper.find('tbody tr:first-child button:last-child').trigger('click')
      await wrapper.vm.$nextTick()

      expect(deleteHoliday).toHaveBeenCalledWith(fakeHolidaysData[0].id)
    })
  })
})
