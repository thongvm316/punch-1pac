import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  pager: {},
  announcement: {},
  announcements: []
}

const mutations = {
  [types.READ_ANNOUNCEMENT] (state, id) {
    const index = state.announcements.findIndex(announcement => announcement.id === id)
    state.announcements[index].readed = true
    state.announcement.readed = true
  },

  [types.RECEIVE_ANNOUNCEMENT] (state, payload) {
    state.announcement = payload
  },

  [types.RECEIVE_ANNOUNCEMENTS] (state, payload) {
    state.pager = payload.meta
    state.announcements = payload.announcements
  }
}

const actions = {
  readAnnouncement ({ commit }, id) {
    axios.post(`/announcements/${id}/read`)
         .then(response => commit(types.READ_ANNOUNCEMENT, id))
  },

  getAnnouncement ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`/announcements/${id}`)
           .then((response) => {
             commit(types.RECEIVE_ANNOUNCEMENT, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  },

  getAnnouncements ({ commit }, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get('/announcements', { params: params })
           .then((response) => {
             commit(types.RECEIVE_ANNOUNCEMENTS, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
