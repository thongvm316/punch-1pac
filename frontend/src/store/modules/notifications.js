import {
  FETCH_HEADER_NOTIFICATIONS,
  FETCH_MORE_HEADER_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  APPROVE_NOTIFICATION_REQUEST,
  REJECT_NOTIFICATION_REQUEST
} from '../mutation-types.js'
import callApi from '../api-caller'

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
    return callApi({
      method: 'get',
      url: '/notifications',
      params: Object.assign({ per_page: 20 }, params)
    })
      .then(response => commit(FETCH_HEADER_NOTIFICATIONS, response.data))
      .catch(error => {
        throw error
      })
  },

  getMoreHeaderNotifications({ commit }, params = {}) {
    return callApi({
      method: 'get',
      url: '/notifications',
      params: Object.assign({ per_page: 20 }, params)
    })
      .then(response => commit(FETCH_MORE_HEADER_NOTIFICATIONS, response.data))
      .catch(error => {
        throw error
      })
  },

  readNotifications({ commit, state }, id) {
    if (state.unreadNotificationsCount === 0) return

    return callApi({ method: 'post', url: `/notifications/${id}/read` })
      .then(response => {
        commit(READ_NOTIFICATIONS)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  rejectNotificationRequest({ commit }, params) {
    return callApi({
      method: 'post',
      url: `/requests/${params.id}/reject`,
      data: { admin_reason: params.admin_reason },
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        commit(REJECT_NOTIFICATION_REQUEST, params.id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  approveNotificationRequest({ commit }, notificationId) {
    return callApi({
      method: 'post',
      url: `/requests/${notificationId}/approve`
    })
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
