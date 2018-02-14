import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  pager: {},
  announcement: {},
  announcements: [],
  headerAnnouncements: []
}

const getters = {
  countHeaderAnnouncements (state) {
    return state.headerAnnouncements.length
  },

  getFirstFive (state) {
    return state.headerAnnouncements.slice(0, 5)
  }
}

const mutations = {
  [types.READ_ANNOUNCEMENT] (state, id) {
    const index1 = state.announcements.findIndex(announcement => announcement.id === id)
    const index2 = state.headerAnnouncements.findIndex(announcement => announcement.id === id)
    if (state.announcements[index1]) state.announcements[index1].readed = true
    state.headerAnnouncements.splice(index2, 1)
    state.announcement.readed = true
  },

  [types.RECEIVE_ANNOUNCEMENT] (state, payload) {
    state.announcement = payload
  },

  [types.RECEIVE_ANNOUNCEMENTS] (state, payload) {
    state.pager = payload.meta
    state.announcements = payload.announcements
  },

  [types.RECEIVE_HEADER_ANNOUNCEMENTS] (state, payload) {
    state.headerAnnouncements = payload.announcements
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
  },

  getHeaderAnnouncements ({ commit }) {
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
