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
    return axios.get('/attendances', { params: Object.assign(state.params, params) })
                .then(response => {
                  commit(types.RECEIVE_ATTENDANCES, response.data)
                  return response
                })
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
