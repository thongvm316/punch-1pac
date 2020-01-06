import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '@/mixins/flatpickr-locale'
import dropdown from '@/mixins/dropdown'
import modal from '@/mixins/modal'
import Notifications from '@/components/Notifications'

const headerNotifications = [
  {
    id: 0,
    activitable: {
      status: 'pending'
    },
    activitable_type: 'Request',
    kind: 'create',
    create_at: '2019-12-02'
  },
  {
    id: 1,
    activitable: {
      status: 'approved'
    },
    kind: 'update',
    create_at: '2019-12-04'
  }
]
const getHeaderNotifications = jest.fn()
const toggleDropdown = jest.spyOn(Notifications.methods, 'toggleDropdown')
const isEditable = jest.spyOn(Notifications.methods, 'isEditable')
const loadMoreOnScroll = jest.fn()

Object.assign(wrapperOps, {
  methods: {
    getHeaderNotifications,
    toggleDropdown,
    loadMoreOnScroll,
    isEditable
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
      expect(dropdownMenu.classes()).toContain('active')
    })
  })

  describe('when headerNotifications', () => {
    it('should render no header notifications', async () => {
      setComputed(wrapper, { headerNotifications: [] })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.headerNotifications).toHaveLength(0)
      expect(wrapper.find({ ref: 'notiList' }).exists()).toBeFalsy()
    })

    it('should render header notifications', async () => {
      setComputed(wrapper, { headerNotifications })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.headerNotifications).toHaveLength(2)
      expect(wrapper.find({ ref: 'notiList' }).exists()).toBeTruthy()
    })
  })
})
