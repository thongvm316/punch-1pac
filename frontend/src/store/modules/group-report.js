import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  results: [],
  reportMeta: {}
}

const mutations = {
  [types.FETCH_GROUP_REPORT] (state, payload) {
    state.results = payload.results
    state.reportMeta = payload.meta
  }
}

const actions = {
  getReport ({ commit }, params) {
    return axios.get(`/groups/${params.group_id}/report`, { params: { date: params.date, date_type: params.type } })
                .then(response => {
                  commit(types.FETCH_GROUP_REPORT, response.data)
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
