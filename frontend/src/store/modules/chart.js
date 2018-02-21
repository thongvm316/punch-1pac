import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  chartData: [],
  loaded: false
}

const mutations = {
  [types.FETCH_CHART_DATA] (state, payload) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    for (let i in months) {
      let monthStatusCount = {
        month: months[i],
        status_count: 0
      }
      for (let k in payload) {
        if (monthStatusCount.month === payload[k].month) {
          monthStatusCount = payload[k]
          break
        }
      }
      state.chartData.push(monthStatusCount.status_count)
    }
    state.loaded = true
  },

  [types.RESET_CHART_DATA_STATE] (state) {
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
  resetChartState ({ commit }) {
    commit(types.RESET_CHART_DATA_STATE)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
