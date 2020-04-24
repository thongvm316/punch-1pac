import {
  FETCH_HEADER_NOTIFICATIONS,
  FETCH_MORE_HEADER_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  APPROVE_NOTIFICATION_REQUEST,
  REJECT_NOTIFICATION_REQUEST
} from '../mutation-types.js'
import Repositories from '@/repository'

const notificationsRepository = Repositories.get('notifications')
const requestsRepository = Repositories.get('requests')

const state = {
  pager: {},
  unreadNotificationsCount: 0,
  lastUnreadNotificationsCount: 0,
  headerNotifications: []
}

const getters = {
  displayNotificationsCount: state => {
    return state.unreadNotificationsCount > 99 ? 99 : state.unreadNotificationsCount
  }
}

const mutations = {
  [FETCH_HEADER_NOTIFICATIONS](state, payload) {
    state.headerNotifications = payload.notifications
    state.unreadNotificationsCount = payload.meta.unread_notifications_count
    state.lastUnreadNotificationsCount = payload.meta.unread_notifications_count
    state.pager = payload.meta
  },

  [FETCH_MORE_HEADER_NOTIFICATIONS](state, payload) {
    state.headerNotifications = state.headerNotifications.concat(payload.notifications)
    state.pager = payload.meta
  },

  [READ_NOTIFICATIONS](state) {
    state.unreadNotificationsCount = 0
    state.lastUnreadNotificationsCount = 0
  },

  [APPROVE_NOTIFICATION_REQUEST](state, notificationId) {
    const index = state.headerNotifications.findIndex(notification => notification.activitable_id === notificationId)
    state.headerNotifications[index].activitable.status = 'approved'
  },

  [REJECT_NOTIFICATION_REQUEST](state, notificationId) {
    const index = state.headerNotifications.findIndex(notification => notification.activitable_id === notificationId)
    state.headerNotifications[index].activitable.status = 'rejected'
  }
}

const actions = {
  getHeaderNotifications({ commit }, params = {}) {
    const requestParams = Object.assign({ per_page: 20 }, params)

    return notificationsRepository.getNotifications(requestParams)
      .then(response => commit(FETCH_HEADER_NOTIFICATIONS, response.data))
      .catch(error => {
        throw error
      })
  },

  getMoreHeaderNotifications({ commit }, params = {}) {
    const requestParams = Object.assign({ per_page: 20 }, params)

    return notificationsRepository.getNotifications(requestParams)
      .then(response => commit(FETCH_MORE_HEADER_NOTIFICATIONS, response.data))
      .catch(error => {
        throw error
      })
  },

  readNotifications({ commit, state }, id) {
    if (state.unreadNotificationsCount === 0) return

    return notificationsRepository.readNotification(id)
      .then(response => {
        commit(READ_NOTIFICATIONS)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  rejectNotificationRequest({ commit }, params) {
    const data = { admin_reason: params.admin_reason }

    return requestsRepository.rejectRequest(params.id, { data })
      .then(response => {
        commit(REJECT_NOTIFICATION_REQUEST, params.id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  approveNotificationRequest({ commit }, notificationId) {
    return requestsRepository.approveRequest(notificationId)
      .then(response => {
        commit(APPROVE_NOTIFICATION_REQUEST, notificationId)
        return response
      })
      .catch(error => {
        throw error
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
