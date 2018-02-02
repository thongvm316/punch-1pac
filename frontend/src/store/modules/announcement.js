import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  announcement: {}
}

const mutations = {
  [types.RECEIVE_ANNOUNCEMENT] (state, payload) {
    state.announcement = payload
  }
}

const actions = {
  getAnnouncement ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`/announcements/${id}`)
           .then((response) => {
             commit(types.RECEIVE_ANNOUNCEMENT, response.data)
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
