import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  results: [],
  companyTotalWorkingHoursOnMonth: 0
}

const mutations = {
  [types.FETCH_GROUP_REPORT] (state, payload) {
    state.results = payload.results
    state.companyTotalWorkingHoursOnMonth = payload.meta.company_total_working_hours_on_month
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
