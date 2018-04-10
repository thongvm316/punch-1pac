import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  pager: {},
  unreadNotificationsCount: 0,
  hasIntervalFetchNotifications: null,
  notifications: []
}

const getters = {
  displayNotificationsCount (state) {
    return state.unreadNotificationsCount > 99 ? 99 : state.unreadNotificationsCount
  }
}

const mutations = {
  [types.FETCH_NOTIFICATIONS] (state, payload) {
    state.notifications = payload.notifications
    state.pager = payload.meta
    state.unreadNotificationsCount = payload.meta.unread_notifications_count
  },

  [types.READ_NOTIFICATIONS] (state, payload) {
    state.unreadNotificationsCount = 0
  },

  [types.SET_INTERVAL_FETCH_NOTIFICATIONS] (state, payload) {
    state.hasIntervalFetchNotifications = payload
  }
}

const actions = {
  getNotifications ({ commit }, params = {}) {
    return axios.get('/notifications', { params: Object.assign({ per_page: 10 }, params) })
                .then(response => commit(types.FETCH_NOTIFICATIONS, response.data))
                .catch(error => { throw error })
  },

  readNotifications ({ commit }, id) {
    return axios.post(`/notifications/${id}/read`)
                .then(response => commit(types.READ_NOTIFICATIONS))
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
