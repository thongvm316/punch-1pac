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

  approveRequest ({ commit }, requestId) {
    return axios.post(`/requests/${requestId}/approve`)
                .then(response => {
                  return response
                })
                .catch(error => { throw error })
  },

  rejectRequest ({ commit }, params) {
    console.log(params)
    return axios.post(`/requests/${params.id}/reject`, { admin_reason: params.admin_reason }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
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
