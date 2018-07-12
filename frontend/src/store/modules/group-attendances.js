import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  params: {},
  pager: {},
  attendances: []
}

const getters = {
  filterAttendances(state) {
    return function(query) {
      const regex = new RegExp(`${query.trim()}`, 'gi')
      return query ? state.attendances.filter(attendance => (attendance.user.name.match(regex)) || (attendance.user.email.match(regex))) : state.attendances
    }
  }
}

const mutations = {
  [types.RECEIVE_GROUP_ATTENDANCES](state, payload) {
    state.pager = payload.meta
    state.attendances = payload.attendances
  }
}

const actions = {
  getAttendances({ commit, state }, params = {}) {
    return axios
      .get('/attendances', { params: Object.assign(state.params, params) })
      .then(response => {
        commit(types.RECEIVE_GROUP_ATTENDANCES, response.data)
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
  getters,
  mutations,
  actions
}
