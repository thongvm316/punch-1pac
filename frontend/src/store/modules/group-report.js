import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  results: []
}

const mutations = {
  [types.FETCH_GROUP_REPORT] (state, payload) {
    state.results = payload
  }
}

const actions = {
  getReport ({ commit }, params) {
    return axios.get(`/groups/${params.group_id}/report`, { params: { date: params.date } })
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