import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  statuses: {}
}

const mutations = {
  [types.FETCH_STATUS_CARDS] (state, data) {
    state.statuses = data
  }
}

const actions = {
  getStatuses ({ commit }, month) {
    return axios.get('/attendances/chart', { params: { date: month } })
                .then(response => {
                  commit(types.FETCH_STATUS_CARDS, response.data)
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
