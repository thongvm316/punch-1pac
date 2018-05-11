import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  pager: {},
  unreadNotificationsCount: 0,
  lastUnreadNotificationsCount: 0,
  hasIntervalFetchNotifications: null,
  headerNotifications: []
}

const getters = {
  displayNotificationsCount (state) {
    return state.unreadNotificationsCount > 99 ? 99 : state.unreadNotificationsCount
  }
}

const mutations = {
  [types.FETCH_HEADER_NOTIFICATIONS] (state, payload) {
    state.headerNotifications = payload.notifications
    state.unreadNotificationsCount = payload.meta.unread_notifications_count
    state.lastUnreadNotificationsCount = payload.meta.unread_notifications_count
    state.pager = payload.meta
  },

  [types.FETCH_NEW_HEADER_NOTIFICATIONS] (state, payload) {
    state.unreadNotificationsCount = payload.meta.unread_notifications_count
    let newNotificationsCount = state.unreadNotificationsCount - state.lastUnreadNotificationsCount

    if (newNotificationsCount > 0) {
      let unreadNotifications = payload.notifications.slice(0, newNotificationsCount)
      unreadNotifications.forEach(notification => state.headerNotifications.unshift(notification))
      state.lastUnreadNotificationsCount = payload.meta.unread_notifications_count
    }
  },

  [types.FETCH_MORE_HEADER_NOTIFICATIONS] (state, payload) {
    state.headerNotifications = state.headerNotifications.concat(payload.notifications)
    state.pager = payload.meta
  },

  [types.READ_NOTIFICATIONS] (state, payload) {
    state.unreadNotificationsCount = 0
    state.lastUnreadNotificationsCount = 0
  },

  [types.SET_INTERVAL_FETCH_NOTIFICATIONS] (state, payload) {
    state.hasIntervalFetchNotifications = payload
  },

  [types.APPROVE_NOTIFICATION_REQUEST] (state, notificationId) {
    const index = state.headerNotifications.findIndex(notification => notification.activitable_id === notificationId)
    state.headerNotifications[index].activitable.status = 'approved'
  },

  [types.REJECT_NOTIFICATION_REQUEST] (state, notificationId) {
    const index = state.headerNotifications.findIndex(notification => notification.activitable_id === notificationId)
    state.headerNotifications[index].activitable.status = 'rejected'
  }
}

const actions = {
  getHeaderNotifications ({ commit }, params = {}) {
    return axios.get('/notifications', { params: Object.assign({ per_page: 20 }, params) })
                .then(response => commit(types.FETCH_HEADER_NOTIFICATIONS, response.data))
                .catch(error => { throw error })
  },

  getNewHeaderNotifications ({ commit }, params = {}) {
    return axios.get('/notifications', { params: Object.assign({ per_page: 20 }, params) })
                .then(response => commit(types.FETCH_NEW_HEADER_NOTIFICATIONS, response.data))
                .catch(error => { throw error })
  },

  getMoreHeaderNotifications ({ commit }, params = {}) {
    return axios.get('/notifications', { params: Object.assign({ per_page: 20 }, params) })
                .then(response => commit(types.FETCH_MORE_HEADER_NOTIFICATIONS, response.data))
                .catch(error => { throw error })
  },

  readNotifications ({ commit }, id) {
    return axios.post(`/notifications/${id}/read`)
                .then(response => commit(types.READ_NOTIFICATIONS))
                .catch(error => { throw error })
  },

  rejectNotificationRequest ({ commit }, params) {
    return axios.post(`/requests/${params.id}/reject`, { admin_reason: params.admin_reason }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.REJECT_NOTIFICATION_REQUEST, params.id)
                  return response
                })
                .catch(error => { throw error })
  },

  approveNotificationRequest ({ commit }, notificationId) {
    return axios.post(`/requests/${notificationId}/approve`)
                .then(response => {
                  commit(types.APPROVE_NOTIFICATION_REQUEST, notificationId)
                  return response
                })
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
