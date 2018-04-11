import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  chartData: []
}

const mutations = {
  [types.FETCH_CHART_DATA] (state, data) {
    state.chartData = data
  }
}

const actions = {
  getChart ({ commit }, month) {
    return axios.get('/attendances/chart', { params: { date: month } })
                .then(response => {
                  commit(types.FETCH_CHART_DATA, response.data)
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
