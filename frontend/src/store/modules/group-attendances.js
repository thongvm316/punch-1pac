import { RECEIVE_GROUP_ATTENDANCES } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  pager: {},
  attendances: []
}

const getters = {
  filterAttendances: state => query => {
    const regex = new RegExp(`${query.trim()}`, 'gi')
    return query ? state.attendances.filter(attendance => (attendance.user.name.match(regex)) || (attendance.user.email.match(regex))) : state.attendances
  }
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
  getters,
  mutations,
  actions
}
