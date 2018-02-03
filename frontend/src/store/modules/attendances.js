import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  params: {},
  pager: {},
  attendances: []
}

const mutations = {
  [types.RECEIVE_ATTENDANCES] (state, payload) {
    state.pager = payload.meta
    state.attendances = payload.attendances
  }
}

const actions = {
  getAttendances ({ commit, state }, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get('/attendances', { params: Object.assign(state.params, params) })
           .then((response) => {
             commit(types.RECEIVE_ATTENDANCES, response.data)
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
