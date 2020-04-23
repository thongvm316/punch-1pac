import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import Repositories from '@/repository'
import AppHeader from '@/components/AppHeader'
jest.mock('@/repository/users')

const usersRepository = Repositories.get('users')
const logout = jest.spyOn(AppHeader.methods, 'logout')
const toggleDropdown = jest.spyOn(AppHeader.methods, 'toggleDropdown')
const toggleLangSelect = jest.spyOn(AppHeader.methods, 'toggleLangSelect')
const updateUser = jest.spyOn(AppHeader.methods, 'updateUser')
const INITIAL_STATES_UPDATE_USER_LANGUAGE = jest.spyOn(AppHeader.methods, 'INITIAL_STATES_UPDATE_USER_LANGUAGE')

Object.assign(wrapperOps, {
  Notifications: true,
  AnnualLeave: true,
  Punch: true
})

describe('AppHeader.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AppHeader, wrapperOps)
    setComputed(wrapper, {
      meta: initialStatesData.meta
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when app header was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when toggleDropdown', () => {
    it('should called toggleDropdown method', async () => {
      wrapper.find({ ref: 'dropdownMenu' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggleDropdown).toHaveBeenCalled()
      expect(wrapper.vm.isDropdownActive).toEqual(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when toggleLanguageSelect', () => {
    it('should called toogleLangSelect method', async () => {
      wrapper.find({ ref: 'toggleLangSelectBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggleLangSelect).toHaveBeenCalled()
      expect(wrapper.vm.isLangSelectActive).toEqual(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when logout method', () => {
    it('should call logout method', async () => {
      wrapper.find({ ref: 'logoutBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(logout).toHaveBeenCalled()
    })
  })

  describe('when user change language', () => {
    it('should call updateUser method', async () => {
      usersRepository.updateUser.mockResolvedValue(null)
      wrapper.setData({ isLangSelectActive: true })
      wrapper.find({ ref: 'toggleLangSelectBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      wrapper.findAll({ ref: 'languageItem' }).at(2).find('a').trigger('click')

      expect(updateUser).toHaveBeenCalled()
    })
  })
})
