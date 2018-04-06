import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  unreadNotificationsCount: 0,
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
    state.unreadNotificationsCount = payload.meta.unread_notifications_count
  },

  [types.READ_NOTIFICATIONS] (state, payload) {
    state.unreadNotificationsCount = 0
  }
}

const actions = {
  getNotifications ({ commit }) {
    return axios.get('/notifications', { params: { per_page: 10 } })
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
