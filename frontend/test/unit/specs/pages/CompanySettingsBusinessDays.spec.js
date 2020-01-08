import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import { companyBusinessDaysData } from '../store/api-data/company-business-days.api'

import SettingLayout from '@/layouts/Setting'
import BusinessDayForm from '@/components/BusinessDayForm'
import CompanySettingsBusinessDays from '@/pages/CompanySettingsBusinessDays'
import Modal from '@/components/Modal.vue'

const fakeBusinessDays = companyBusinessDaysData()
const deleteBusinessDay = jest.fn()
const fetchBusinessDays = jest.fn()
const toggleAddModal = jest.spyOn(CompanySettingsBusinessDays.methods, 'toggleAddModal')
const toggleEditModal = jest.spyOn(CompanySettingsBusinessDays.methods, 'toggleEditModal')

describe('CompanySettingsBusinessDays.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsBusinessDays, {
      ...wrapperOps,
      computed: {
        businessDays() { return fakeBusinessDays }
      },
      methods: {
        fetchBusinessDays,
        deleteBusinessDay,
        toggleAddModal,
        toggleEditModal
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsBusinessDays mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
      expect(wrapper.findAll(Modal).length).toBe(2)
    })

    it('should call fetchBusinessDays', () => {
      expect(fetchBusinessDays).toHaveBeenCalled()
    })
  })

  describe('when click add Business Day', () => {
    beforeEach(async () => {
      wrapper.find({ ref: 'btnAddBusinessDay' }).trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should open modal add Business Day with BusinessDayForm', () => {
      expect(toggleAddModal).toHaveBeenCalled()
      expect(wrapper.vm.isAddModalOpen).toBeTruthy()
      expect(wrapper.find(BusinessDayForm).exists()).toBeTruthy()
    })

    it('should close modal Business Day when submit BusinessDayForm', async () => {
      wrapper.find(BusinessDayForm).vm.$emit('afterModify')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isAddModalOpen).toBeFalsy()
    })
  })

  describe('when click edit Business Day on first record', () => {
    beforeEach(async () => {
      wrapper.find('tbody button:first-child').trigger('click')
      await wrapper.vm.$nextTick()
    }
    )
    it('should open modal edit Business Day with BusinessDayForm', () => {
      expect(toggleEditModal).toHaveBeenCalledWith(fakeBusinessDays[0])
      expect(wrapper.vm.isEditModalOpen).toBeTruthy()
      expect(wrapper.find(BusinessDayForm).exists()).toBeTruthy()
    })

    it('should close modal add Business Day when submit BusinessDayForm', async () => {
      wrapper.find(BusinessDayForm).vm.$emit('afterModify')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isAddModalOpen).toBeFalsy()
    })
  })

  describe('when click delete Business Day on first record', () => {
    it('should open modal edit ip address with BusinessDayForm', async () => {
      wrapper.find('tbody button:last-child').trigger('click')
      await wrapper.vm.$nextTick()

      expect(deleteBusinessDay).toHaveBeenCalledWith(fakeBusinessDays[0].id)
    })
  })
})
