import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import { allowedIPsData } from '../store/api-data/allowed-ips.api'

import SettingLayout from '@/layouts/Setting'
import AllowedIpForm from '@/components/AllowedIpForm'
import CompanySettingsAllowedIPs from '@/pages/CompanySettingsAllowedIPs'
import Modal from '@/components/Modal.vue'

const fakeAllowedIps = allowedIPsData()
const deleteIP = jest.fn()
const fetchIPs = jest.fn()
const toggleAddModal = jest.spyOn(CompanySettingsAllowedIPs.methods, 'toggleAddModal')
const toggleEditModal = jest.spyOn(CompanySettingsAllowedIPs.methods, 'toggleEditModal')

describe('CompanySettingsAllowedIPs.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsAllowedIPs, {
      ...wrapperOps,
      computed: {
        allowedIPs() { return fakeAllowedIps }
      },
      methods: {
        fetchIPs,
        deleteIP,
        toggleAddModal,
        toggleEditModal
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsAllowedIPs mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
      expect(wrapper.findAll(Modal).length).toBe(2)
    })

    it('should call fetchIPs', () => {
      expect(fetchIPs).toHaveBeenCalled()
    })
  })

  describe('when click add IP address', () => {
    beforeEach(async () => {
      wrapper.find({ ref: 'btnAddIpAddress' }).trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should open modal add Ip address with AllowedIpForm', () => {
      expect(toggleAddModal).toHaveBeenCalled()
      expect(wrapper.vm.isAddModalOpen).toBeTruthy()
      expect(wrapper.find(AllowedIpForm).exists()).toBeTruthy()
    })

    it('should close modal add Ip when submit AllowedIpForm', async () => {
      wrapper.find(AllowedIpForm).vm.$emit('afterModify')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isAddModalOpen).toBeFalsy()
    })
  })

  describe('when click edit IP address on first record', () => {
    beforeEach(async () => {
      wrapper.find('tbody button:first-child').trigger('click')
      await wrapper.vm.$nextTick()
    }
    )
    it('should open modal edit ip address with AllowedIpForm', () => {
      expect(toggleEditModal).toHaveBeenCalledWith(fakeAllowedIps[0])
      expect(wrapper.vm.isEditModalOpen).toBeTruthy()
      expect(wrapper.find(AllowedIpForm).exists()).toBeTruthy()
    })

    it('should close modal add Ip when submit AllowedIpForm', async () => {
      wrapper.find(AllowedIpForm).vm.$emit('afterModify')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isAddModalOpen).toBeFalsy()
    })
  })

  describe('when click delete IP address on first record', () => {
    it('should open modal edit ip address with AllowedIpForm', async () => {
      wrapper.find('tbody button:last-child').trigger('click')
      await wrapper.vm.$nextTick()

      expect(deleteIP).toHaveBeenCalledWith(fakeAllowedIps[0].id)
    })
  })
})
