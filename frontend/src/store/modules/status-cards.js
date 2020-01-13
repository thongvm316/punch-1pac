import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  statuses: {},
  meta: {}
}

const mutations = {
  [types.FETCH_STATUS_CARDS](state, payload) {
    state.statuses = payload.statuses
    state.meta = payload.meta
  }
}

const actions = {
  getStatuses({ commit }, month) {
    return callApi({
      method: 'get',
      url: '/attendances/chart',
      params: { date: month }
    })
      .then(response => {
        commit(types.FETCH_STATUS_CARDS, response.data)
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
