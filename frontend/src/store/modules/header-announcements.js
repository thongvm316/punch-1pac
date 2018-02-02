import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  numAnnouncement: 3,
  announcements: []
}

const mutations = {
  [types.RECEIVE_HEADER_ANNOUNCEMENTS] (state, payload) {
    state.announcements = payload.announcements
  }
}

const actions = {
  getAnnouncements ({ commit }) {
    axios.get('/announcements', { params: { per_page: 5 } })
         .then((response) => {
           commit(types.RECEIVE_HEADER_ANNOUNCEMENTS, response.data)
         })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
