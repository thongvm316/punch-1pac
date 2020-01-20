import { RECEIVE_GROUP_ATTENDANCES } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  pager: {},
  attendances: []
}

const mutations = {
  [RECEIVE_GROUP_ATTENDANCES](state, payload) {
    state.pager = payload.meta
    state.attendances = payload.attendances
  }
}

const actions = {
  getAttendances({ commit, state }, params = {}) {
    return callApi({ method: 'get', url: '/attendances', params })
      .then(response => {
        commit(RECEIVE_GROUP_ATTENDANCES, response.data)
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
