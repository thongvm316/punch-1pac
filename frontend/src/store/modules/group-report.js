import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  results: [],
  reportMeta: {},
  singleReport: []
}

const mutations = {
  [types.FETCH_GROUP_REPORT](state, payload) {
    state.results = payload.results
    state.reportMeta = payload.meta
  },

  [types.FETCH_PERSONAL_REPORT](state, payload) {
    state.singleReport = payload
  }
}

const actions = {
  getGroupReport({ commit }, params) {
    return axios
      .get(`/groups/${params.group_id}/report`, { params: { date: params.date, date_type: params.type } })
      .then(response => {
        commit(types.FETCH_GROUP_REPORT, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getPersonalReport({ commit }, params) {
    return axios
      .get(`/groups/${params.group_id}/report/${params.user_id}`, { params: { date: params.date, date_type: params.type } })
      .then(response => {
        commit(types.FETCH_PERSONAL_REPORT, response.data)
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
