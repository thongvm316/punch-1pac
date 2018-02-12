import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  announcements: []
}

const getters = {
  countUnreadAnnouncements (state) {
    return state.announcements.length
  },

  getFirstFive (state) {
    return state.announcements.slice(0, 5)
  }
}

const mutations = {
  [types.RECEIVE_HEADER_ANNOUNCEMENTS] (state, payload) {
    state.announcements = payload.announcements
  }
}

const actions = {
  getAnnouncements ({ commit }) {
    axios.get('/announcements', { params: { per_page: 200, read_status: 'unread' } })
         .then((response) => {
           commit(types.RECEIVE_HEADER_ANNOUNCEMENTS, response.data)
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
