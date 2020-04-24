import { RECEIVE_GROUP_ATTENDANCES } from '../mutation-types.js'
import Repositories from '@/repository'

const attendancesRepository = Repositories.get('attendances')

const state = {
  pager: {},
  attendances: []
}

const getters = {
  filterAttendances: state => query => {
    const regex = new RegExp(`${query.trim()}`, 'gi')
    return query ? state.attendances.filter(attendance => attendance.user.name.match(regex) || attendance.user.email.match(regex)) : state.attendances
  }
}

const mutations = {
  [RECEIVE_GROUP_ATTENDANCES](state, payload) {
    state.pager = payload.meta
    state.attendances = payload.attendances
  }
}

const actions = {
  getAttendances({ commit }, params = {}) {
    const paramsRequest = { ...params, date_type: params.date_type || 'range' }

    return attendancesRepository.getAttendances(paramsRequest)
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
