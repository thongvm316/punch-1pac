import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  pager: {},
  headerAnnouncements: []
}

const mutations = {
  [types.READ_ANNOUNCEMENT](state, id) {
    const index = state.headerAnnouncements.findIndex(announcement => announcement.id === id)
    state.headerAnnouncements.splice(index, 1)
  },

  [types.RECEIVE_HEADER_ANNOUNCEMENTS](state, payload) {
    state.headerAnnouncements = payload.announcements
  }
}

const actions = {
  readAnnouncement({ commit }, id) {
    callApi({ method: 'post', url: `/announcements/${id}/read` })
      .then(response => {
        commit(types.READ_ANNOUNCEMENT, id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getHeaderAnnouncements({ commit }) {
    callApi({ method: 'get', url: '/announcements', params: { per_page: 200, read_status: 'unread' } })
      .then(response => {
        commit(types.RECEIVE_HEADER_ANNOUNCEMENTS, response.data)
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
  mutations,
  actions
}
