import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  chartData: [],
  loaded: false
}

const mutations = {
  [types.FETCH_CHART_DATA] (state, data) {
    state.chartData = data
    state.loaded = true
  },

  [types.RESET_CHART_DATA] (state) {
    state.loaded = false
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
  },

  resetChart ({ commit }) {
    commit(types.RESET_CHART_DATA)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
