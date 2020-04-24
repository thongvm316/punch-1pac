import notifications from '@/store/modules/notifications'
import Repositories from '@/repository'
import notificationsData from '../../../supports/fixtures/notifications.api'
import error422 from '../../../supports/fixtures/errors.api'
jest.mock('@/repository/requests')
jest.mock('@/repository/notifications')

const notificationsRepository = Repositories.get('notifications')
const requestsRepository = Repositories.get('requests')
const { state, mutations, actions, getters } = notifications
const commit = jest.fn()

describe('mutations', () => {
  let payload
  const notificationId = 1

  describe('when FETCH_HEADER_NOTIFICATIONS', () => {
    it('should FETCH_HEADER_NOTIFICATIONS', () => {
      payload = { ...notificationsData }
      mutations.FETCH_HEADER_NOTIFICATIONS(state, payload)

      expect(state.headerNotifications).toEqual(payload.notifications)
      expect(state.pager).toEqual(payload.meta)
      expect(state.unreadNotificationsCount).toBe(10)
      expect(state.lastUnreadNotificationsCount).toBe(10)
    })
  })

  describe('when handle exists notifications', () => {
    beforeEach(() => {
      state.headerNotifications = [...notificationsData.notifications]
    })

    it('should FETCH_MORE_HEADER_NOTIFICATIONS', () => {
      payload = { ...notificationsData }
      mutations.FETCH_MORE_HEADER_NOTIFICATIONS(state, payload)

      expect(state.headerNotifications).toHaveLength(6)
      expect(state.pager).toEqual(payload.meta)
    })

    it('should READ_NOTIFICATIONS', () => {
      mutations.READ_NOTIFICATIONS(state)

      expect(state.unreadNotificationsCount).toBe(0)
      expect(state.lastUnreadNotificationsCount).toBe(0)
    })

    it('should APPROVE_NOTIFICATION_REQUEST', () => {
      mutations.APPROVE_NOTIFICATION_REQUEST(state, notificationId)

      expect(state.headerNotifications[1].activitable.status).toEqual('approved')
    })

    it('should REJECT_NOTIFICATION_REQUEST', () => {
      mutations.REJECT_NOTIFICATION_REQUEST(state, notificationId)

      expect(state.headerNotifications[1].activitable.status).toEqual('rejected')
    })
  })
})

describe('actions', () => {
  let response

  describe('when getHeaderNotifications', () => {
    it('should commit FETCH_HEADER_NOTIFICATIONS', async () => {
      response = { data: {...notificationsData} }
      notificationsRepository.getNotifications.mockResolvedValue(response)
      await actions.getHeaderNotifications({ commit }, {})

      expect(commit).toHaveBeenCalledWith('FETCH_HEADER_NOTIFICATIONS', response.data)
    })
  })

  describe('when getMoreHeaderNotifications', () => {
    it('should commit FETCH_MORE_HEADER_NOTIFICATIONS', async () => {
      response = { data: {...notificationsData} }
      notificationsRepository.getNotifications.mockResolvedValue(response)
      await actions.getMoreHeaderNotifications({ commit }, {})

      expect(commit).toHaveBeenCalledWith('FETCH_MORE_HEADER_NOTIFICATIONS', response.data)
    })
  })

  describe('when readNotifications', () => {
    const id = 1

    it('should commit READ_NOTIFICATIONS', async () => {
      response = { data: {...notificationsData} }
      state.unreadNotificationsCount = 1
      notificationsRepository.readNotification.mockResolvedValue(response)
      await actions.readNotifications({ commit, state }, id)

      expect(commit).toHaveBeenCalledWith('READ_NOTIFICATIONS')
    })

    it('should no commit', () => {
      state.unreadNotificationsCount = 0
      actions.readNotifications({ commit, state }, id)

      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('when rejectNotificationRequest', () => {
    it('should commit REJECT_NOTIFICATION_REQUEST', async () => {
      const params = { id: 1, admin_reason: 'no need' }
      response = { data: {...notificationsData} }
      requestsRepository.rejectRequest.mockResolvedValue(response)
      await actions.rejectNotificationRequest({ commit }, params)

      expect(commit).toHaveBeenCalledWith('REJECT_NOTIFICATION_REQUEST', params.id)
    })
  })

  describe('when approveNotificationRequest', () => {
    it('should commit APPROVE_NOTIFICATION_REQUEST', async () => {
      const notificationId = 1
      response = { data: {...notificationsData} }
      requestsRepository.approveRequest.mockResolvedValue(response)
      await actions.approveNotificationRequest({ commit }, notificationId)

      expect(commit).toHaveBeenCalledWith('APPROVE_NOTIFICATION_REQUEST', notificationId)
    })
  })
})

describe('getters', () => {
  describe('when displayNotificationsCount', () => {
    let notiCount

    it('should return notiCount', () => {
      state.unreadNotificationsCount = 10
      notiCount = getters.displayNotificationsCount(state)

      expect(notiCount).toBe(10)
    })

    it('should return max notiCount', () => {
      state.unreadNotificationsCount = 100
      notiCount = getters.displayNotificationsCount(state)

      expect(notiCount).toBe(99)
    })
  })
})
