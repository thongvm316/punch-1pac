import { READ_ANNOUNCEMENT, RECEIVE_HEADER_ANNOUNCEMENTS } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  pager: {},
  headerAnnouncements: []
}

const mutations = {
  [READ_ANNOUNCEMENT](state, id) {
    const index = state.headerAnnouncements.findIndex(announcement => announcement.id === id)
    state.headerAnnouncements.splice(index, 1)
  },

  [RECEIVE_HEADER_ANNOUNCEMENTS](state, payload) {
    state.headerAnnouncements = payload.announcements
  }
}

const actions = {
  readAnnouncement({ commit }, id) {
    return callApi({ method: 'post', url: `/announcements/${id}/read` })
      .then(response => {
        commit(READ_ANNOUNCEMENT, id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getHeaderAnnouncements({ commit }) {
    return callApi({ method: 'get', url: '/announcements', params: { per_page: 200, read_status: 'unread' } })
      .then(response => {
        commit(RECEIVE_HEADER_ANNOUNCEMENTS, response.data)
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
