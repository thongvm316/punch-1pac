import * as types from '../mutation-types'
import callApi from '../api-caller'

const state = {
  results: [],
  reportMeta: {},
  personalReport: {
    report: {},
    totalWorkingDays: null,
    totalWorkingHours: null
  }
}

const mutations = {
  [types.FETCH_GROUP_REPORT](state, payload) {
    state.results = payload.results
    state.reportMeta = payload.meta
  },

  [types.FETCH_PERSONAL_REPORT](state, payload) {
    state.personalReport = {
      report: payload.report,
      totalWorkingDays: payload.meta.company_total_working_days_in_month,
      totalWorkingHours: payload.meta.company_total_working_hours_on_month
    }
  }
}

const actions = {
  getGroupReport({ commit }, params) {
    return callApi({
      method: 'get',
      url: `/groups/${params.group_id}/report`,
      params: { date: params.date, date_type: params.type }
    })
    .then(response => {
      commit(types.FETCH_GROUP_REPORT, response.data)
      return response
    })
    .catch(error => {
      throw error
    })
  },

  getPersonalReport({ commit }, params) {
    return callApi({
      method: 'get',
      url: `/groups/${params.group_id}/users/${params.user_id}/report`,
      params: {
        date: params.date,
        date_type: params.type || 'month',
        from_date: params.from_date,
        to_date: params.to_date
      }
    })
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
