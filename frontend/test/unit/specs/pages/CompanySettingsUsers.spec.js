import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import { usersData } from '../store/api-data/users.api'

import SettingLayout from '@/layouts/Setting'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import ConfirmDialogMixins from '@/mixins/confirm-dialog.js'
import UserProfile from '@/components/UserProfile'
import CompanySettingsUsers from '@/pages/CompanySettingsUsers'
import Modal from '@/components/Modal.vue'

const fakeUsersData = usersData().users
const fetchUsers = jest.fn()
const deactivateUser = jest.fn()
const activateUser = jest.fn()
const openConfirmDialog = jest.spyOn(ConfirmDialogMixins.methods, 'openConfirmDialog')
const toggleEditModal = jest.spyOn(CompanySettingsUsers.methods, 'toggleEditModal')
const filterByEmail = jest.fn().mockImplementation(state => query => {
  return fakeUsersData
})

describe('CompanySettingsUsers.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsUsers, {
      ...wrapperOps,
      methods: {
        fetchUsers,
        toggleEditModal,
        deactivateUser,
        activateUser,
        openConfirmDialog
      },
      computed: {
        filterByEmail,
        currentUser() {
          return {
            role: 'superadmin'
          }
        }
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsUsers mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
      expect(wrapper.find(ConfirmDialog).exists()).toBeTruthy()
      expect(wrapper.find(Modal).exists()).toBeTruthy()
    })

    it('should call fetchHolidays', () => {
      expect(fetchUsers).toHaveBeenCalled()
    })

    it('should call filterByEmail', () => {
      expect(filterByEmail).toHaveBeenCalled()
    })

    it('should display 3 record', () => {
      expect(wrapper.findAll('tbody tr').length).toBe(3)
    })

    it('should display 3 action buttons on first record', () => {
      expect(wrapper.findAll('tbody tr:first-child button').length).toBe(3)
    })

    it('should display 0 action buttons on second record', () => {
      expect(wrapper.findAll('tbody tr:nth-child(2) button').length).toBe(0)
    })

    it('should display 2 action buttons on third record', () => {
      expect(wrapper.findAll('tbody tr:last-child button').length).toBe(2)
    })
  })

  describe('when click edit user on first record (member)', () => {
    beforeEach(async () => {
      wrapper.find('tbody tr:first-child button:first-child').trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should call toggleEditModal with arg is first record', () => {
      expect(toggleEditModal).toHaveBeenCalledWith(fakeUsersData[0])
    })

    it('should display modal with UserProfile form', () => {
      expect(wrapper.vm.isEditModalOpen).toBeTruthy()
    })

    it('should close modal afterUserProfileUpdated', async () => {
      wrapper.find(UserProfile).vm.$emit('afterUserProfileUpdated')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isEditModalOpen).toBeFalsy()
    })
  })

  describe('when click activate user on first record (member)', () => {
    it('should call activateUser with first record user id', async () => {
      wrapper.find('tbody tr:first-child button:nth-child(2)').trigger('click')
      await wrapper.vm.$nextTick()

      expect(activateUser).toHaveBeenCalledWith(fakeUsersData[0].id)
    })
  })

  describe('when click delete user on fisrt record (member)', () => {
    beforeEach(async () => {
      wrapper.find('tbody tr:first-child button:nth-child(3)').trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should call openConfirmDialog with first record user as argument', () => {
      expect(openConfirmDialog).toHaveBeenCalledWith(fakeUsersData[0])
    })

    it('should open ConfirmDialog', () => {
      expect(wrapper.vm.isOpenConfirmDialog).toBeTruthy()
    })
  })

  describe('when click btn deactivate user on last record', () => {
    it('should call deactivateUser with record id', async () => {
      wrapper.find('tbody tr:last-child button:nth-child(2)').trigger('click')
      await wrapper.vm.$nextTick()

      expect(deactivateUser).toHaveBeenCalledWith(fakeUsersData[2].id)
    })
  })
})
