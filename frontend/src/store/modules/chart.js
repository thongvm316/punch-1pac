import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  chartData: [],
  loaded: false
}

const mutations = {
  [types.FETCH_CHART_DATA] (state, statuses) {
    let data = []

    for (let month = 1; month <= 12; month++) {
      const status = statuses.find(status => status.month === month)
      const count = status ? status.status_count : 0
      data.push(count)
    }

    state.chartData = data
    state.loaded = true
  },

  [types.RESET_CHART_DATA] (state) {
    state.loaded = false
  }
}

const actions = {
  getChart ({ commit }, params) {
    return axios.get(`/attendances/chart?status=${params}`)
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
