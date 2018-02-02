import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  announcements: []
}

const mutations = {
  [types.RECEIVE_ANNOUNCEMENTS] (state, payload) {
    state.announcements = payload.announcements
  }
}

const actions = {
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
