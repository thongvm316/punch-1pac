import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import AppHeader from '@/components/AppHeader'
import Notifications from '@/components/Notifications'
import Punch from '@/components/Punch'
import AnnualLeave from '@/components/AnnualLeave'

const logout = jest.fn()
const toggleDropdown = jest.spyOn(AppHeader.methods, 'toggleDropdown')
const toggleLangSelect = jest.spyOn(AppHeader.methods, 'toggleLangSelect')
const updateUser = jest.fn()

Object.assign(wrapperOps, {
  methods: {
    logout,
    toggleDropdown,
    toggleLangSelect,
    updateUser
  }
})

describe('AppHeader.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AppHeader, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when app header was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })

    it('should render sub components', () => {
      expect(wrapper.find(Notifications).isVueInstance()).toBe(true)
      expect(wrapper.find(Notifications).exists()).toBe(true)
      expect(wrapper.find(Punch).isVueInstance()).toBe(true)
      expect(wrapper.find(Punch).exists()).toBe(true)
      expect(wrapper.find(AnnualLeave).isVueInstance()).toBe(true)
      expect(wrapper.find(AnnualLeave).exists()).toBe(true)
    })
  })

  describe('when toggle dropdown', () => {
    it('should called toggleDropdown method', async () => {
      wrapper.find('.dropdown').trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggleDropdown).toHaveBeenCalled()
      expect(wrapper.vm.isDropdownActive).toEqual(true)
      expect(wrapper.find({ ref: 'dropdownMenu' }).classes()).toContain('active')
    })
  })

  describe('when toggle language selector', () => {
    it('should called toogleLangSelect', async () => {
      wrapper.find({ ref: 'toggleLangSelectBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggleLangSelect).toHaveBeenCalled()
      expect(wrapper.vm.isLangSelectActive).toEqual(true)
      expect(wrapper.findAll('.triangle-top').length).toEqual(1)
      expect(wrapper.find('.lang-select').exists()).toBe(true)
    })
  })

  describe('when logout method', () => {
    it('should call logout method', async () => {
      wrapper.find({ ref: 'logoutBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(logout).toHaveBeenCalled()
      expect(wrapper.find({ ref: 'logoutBtn' }).exists()).toBe(true)
    })
  })

  //describe('when user set language', () => {
    //beforeEach(async () => {
      //wrapper.find({ ref: 'toggleLangSelectBtn' }).trigger('click')
      //await wrapper.vm.$nextTick()
    //})

    //it('should call updateUser method', () => {
      //expect(wrapper.vm.isLangSelectActive).toEqual(true)
      //expect(wrapper.find({ ref: 'updateUserBtn' }).exists()).toBe(true)
      //expect(updateUser).toHaveBeenCalled()
    //})
  //})
})
