import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import flatpickrLocale from '@/mixins/flatpickr-locale'
import dropdown from '@/mixins/dropdown'
import modal from '@/mixins/modal'
import Notifications from '@/components/Notifications'

const headerNotifications = [
  {
    id: 0,
    activitable: {
      status: 'pending',
      type: 'Request'
    },
    user: {},
    activitable_type: 'Request',
    kind: 'update',
    create_at: '2019-12-02'
  },
  {
    id: 1,
    activitable: {
      status: 'approved'
    },
    user: {},
    kind: 'update',
    activitable_type: 'Request',
    create_at: '2019-12-04'
  }
]
const getHeaderNotifications = jest.fn()
const toggleDropdown = jest.spyOn(Notifications.methods, 'toggleDropdown')
const isEditable = jest.spyOn(Notifications.methods, 'isEditable')
const loadMoreOnScroll = jest.fn()
const readNotifications = jest.fn()

Object.assign(wrapperOps, {
  methods: {
    getHeaderNotifications,
    toggleDropdown,
    loadMoreOnScroll,
    isEditable,
    readNotifications
  },
  mixins: [dropdown, modal, flatpickrLocale]
})

describe('Notifications.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Notifications, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Notifications was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('when click dropdownMenu', () => {
    it('should call toggleDropdown method', async () => {
      const dropdownMenu = wrapper.find({ ref: 'dropdownMenu' })
      dropdownMenu.trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggleDropdown).toHaveBeenCalled()
      expect(wrapper.vm.isDropdownActive).toBe(true)
      expect(dropdownMenu.isVisible()).toBeTruthy()
    })
  })

  describe('when dont have headerNotifications', () => {
    it('should render no header notifications', async () => {
      setComputed(wrapper, { headerNotifications: [] })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.headerNotifications).toHaveLength(0)
      expect(wrapper.find({ ref: 'notiList' }).exists()).toBeFalsy()
    })
  })

  describe('when have headerNotifications', () => {
    let editableNoti, uneditableNoti

    beforeEach(async () => {
      setComputed(wrapper, { headerNotifications })
      await wrapper.vm.$nextTick()

      editableNoti = wrapper.find({ ref: 'notiList' }).find('li:first-child')
      uneditableNoti = wrapper.find({ ref: 'notiList' }).find('li:last-child')
    })

    it('should render header notifications', () => {
      expect(wrapper.vm.headerNotifications).toHaveLength(2)
      expect(wrapper.find({ ref: 'notiList' }).exists()).toBeTruthy()
    })

    it('editable noti should show pending label', () => {
      expect(editableNoti.find('.label-warning').exists()).toBeTruthy()
    })

    it('should show modal when click on editable request notification', async () => {
      editableNoti.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find({ ref: 'requestModal' }).exists()).toBeTruthy()
      expect(wrapper.find({ ref: 'requestModal' }).isVisible()).toBeTruthy()
    })

    it('uneditable noti should show pending label', () => {
      expect(uneditableNoti.find('.label-warning').exists()).toBeFalsy()
    })

    it('modal should not exist when click on uneditable request notification', async () => {
      uneditableNoti.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find({ ref: 'requestModal' }).exists()).toBeFalsy()
    })

    it('should call loadMoreOnScroll when user open noti list and trigger scroll', async () => {
      wrapper.find({ ref: 'dropdownMenu' }).trigger('click')
      wrapper.find({ ref: 'notiList' }).trigger('scroll')
      await wrapper.vm.$nextTick()

      expect(loadMoreOnScroll).toHaveBeenCalled()
    })
  })
})
