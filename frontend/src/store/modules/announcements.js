import { READ_ANNOUNCEMENT, RECEIVE_HEADER_ANNOUNCEMENTS } from '../mutation-types.js'
import Repository from '@/repository'

const announcementsRepository = Repository.get('announcements')

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
    return announcementsRepository.readAnnouncement(id)
      .then(response => {
        commit(READ_ANNOUNCEMENT, id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getHeaderAnnouncements({ commit }) {
    const params = { per_page: 200, read_status: 'unread' }

    return announcementsRepository.getHeaderAnnouncements(params)
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
