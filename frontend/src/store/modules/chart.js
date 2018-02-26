import * as types from '../mutation-types.js'
import axios from 'axios'
import moment from 'moment'

const state = {
  chartData: [],
  loaded: false
}

const mutations = {
  [types.FETCH_CHART_DATA] (state, statuses) {
    const months = moment.months()
    let data = []

    months.forEach(month => {
      const status = statuses.find(status => status.month === month)
      const count = status ? status.status_count : 0
      data.push(count)
    })

    state.chartData = data
    state.loaded = true
  },

  [types.RESET_CHART_DATA] (state) {
    state.loaded = false
  }
}

const actions = {
  getChart ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios.get(`/attendances/chart?status=${params}`)
           .then((response) => {
             commit(types.FETCH_CHART_DATA, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
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
