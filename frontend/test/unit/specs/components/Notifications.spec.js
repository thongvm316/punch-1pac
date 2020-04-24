import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import notificationsData from '../../supports/fixtures/notifications.api'
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
const getHeaderNotifications = jest.spyOn(Notifications.methods, 'getHeaderNotifications')
const toggleDropdown = jest.spyOn(Notifications.methods, 'toggleDropdown')
const isEditable = jest.spyOn(Notifications.methods, 'isEditable')
const loadMoreOnScroll = jest.spyOn(Notifications.methods, 'loadMoreOnScroll')
const openRequestModal = jest.spyOn(Notifications.methods, 'openRequestModal')
const readNotifications = jest.fn()

const localWrapperOps = {
  ...wrapperOps,
  data() {
    return {
      isDropdownActive: true
    }
  },
  stubs: {
    flatPickr: true,
    Modal: true,
    PIcoBell: true
  }
}

describe('Notifications.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Notifications, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Notifications was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(getHeaderNotifications).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when have headerNotifications', () => {
    let editableNoti, uneditableNoti

    beforeEach(async () => {
      setComputed(wrapper, {
        headerNotifications,
        isRequestDayOff: false
      })
      await wrapper.vm.$nextTick()

      editableNoti = wrapper.find({ ref: 'notiList' }).find('li:first-child')
      uneditableNoti = wrapper.find({ ref: 'notiList' }).find('li:last-child')
    })

    it('should render header notifications', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should show modal when click on editable request notification', async () => {
      editableNoti.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })

    it('should not exist modal when click on uneditable request notification', async () => {
      uneditableNoti.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })

    it('should call toggleDropdown', () => {
      wrapper.find({ ref: 'dropdownMenu' }).trigger('click')

      expect(toggleDropdown).toHaveBeenCalled()
    })

    it('should call openRequestModal', async () => {
      wrapper.findAll('.notification-dropdown li').at(1).trigger('click')

      expect(openRequestModal).toHaveBeenCalledWith(headerNotifications[1])
    })
  })
})
