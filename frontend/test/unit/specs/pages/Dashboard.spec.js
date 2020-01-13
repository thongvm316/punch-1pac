import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import { pendingRequestsData } from '../store/api-data/pending-requests.api'
import { activitiesData } from '../store/api-data/activities.api'

import MainLayout from '@/layouts/Main.vue'
import FullCalendar from '@/components/FullCalendar.vue'
import StatusCards from '@/components/StatusCards.vue'
import Dashboard from '@/pages/Dashboard'

const fakePagerNextPage = 2
const fakePendingRequests = pendingRequestsData()
const fakeActivities = activitiesData().activities.map(activity => ({ ...activity, user: { avatar_url: '/', name: 'test' } }))
const getActivities = jest.fn()
const getGroupPendingRequests = jest.fn()
const getMoreActivities = jest.fn()

describe('Dashboard.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Dashboard, {
      ...wrapperOps,
      stubs: {
        RouterLink: '<li></li>'
      },
      methods: {
        getActivities,
        getGroupPendingRequests,
        getMoreActivities
      },
      computed: {
        currentUser() { return { role: 'superadmin' } },
        activities() { return fakeActivities },
        pendingRequests() { return fakePendingRequests },
        pager() { return { next_page: fakePagerNextPage } }
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Dashboard mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(MainLayout).exists()).toBeTruthy()
      expect(wrapper.find(FullCalendar).exists()).toBeTruthy()
      expect(wrapper.find(StatusCards).exists()).toBeTruthy()
    })

    it('should call getActivities, getGroupPendingRequests', () => {
      expect(getActivities).toHaveBeenCalled()
      expect(getGroupPendingRequests).toHaveBeenCalled()
    })

    it('should display PendingBlock', () => {
      expect(wrapper.findAll('.box').length).toBe(3)
    })

    it('should display 2 record in activity list', () => {
      expect(wrapper.findAll('.notifications li').length).toBe(2)
    })

    it('should display 2 record in Pending request list', () => {
      expect(wrapper.findAll('.list-pending-requests li').length).toBe(2)
    })

    it('should display button show more', () => {
      expect(wrapper.find('button[type=button]').exists()).toBeTruthy()
    })
  })

  describe('when click button show more', () => {
    it('should call getMoreActivities with correct arg', async () => {
      wrapper.find('button[type=button]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(getMoreActivities).toHaveBeenCalledWith({ page: fakePagerNextPage })
    })
  })

  describe('when have no PendingRequests', () => {
    it('should not display list-pending-requests', () => {
      wrapper = shallowMount(Dashboard, {
        ...wrapperOps
      })

      expect(wrapper.find('.list-pending-requests').exists()).toBeFalsy()
    })
  })

  describe('when have no Activities', () => {
    beforeEach(() => {
      wrapper = shallowMount(Dashboard, {
        ...wrapperOps
      })
    })

    it('should not display notifications', () => {
      expect(wrapper.find('.notifications').exists()).toBeFalsy()
    })

    it('should not display button show more', () => {
      expect(wrapper.find('button[type=button]').exists()).toBeFalsy()
    })
  })
})
