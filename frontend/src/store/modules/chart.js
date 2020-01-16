import { FETCH_CHART_DATA } from '../mutation-types.js'
import axios from 'axios'

const state = {
  chartData: []
}

const mutations = {
  [FETCH_CHART_DATA](state, data) {
    state.chartData = data
  }
}

const actions = {
  getChart({ commit }, month) {
    return axios
      .get('/attendances/chart', { params: { date: month } })
      .then(response => {
        commit(FETCH_CHART_DATA, response.data)
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
