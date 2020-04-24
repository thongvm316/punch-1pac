import { FETCH_GROUP_REPORT, FETCH_PERSONAL_REPORT } from '../mutation-types'
import Repositories from '@/repository'

const groupsRepository = Repositories.get('groups')

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
  [FETCH_GROUP_REPORT](state, payload) {
    state.results = payload.results
    state.reportMeta = payload.meta
  },

  [FETCH_PERSONAL_REPORT](state, payload) {
    state.personalReport = {
      report: payload.report,
      totalWorkingDays: payload.meta.company_total_working_days_in_month,
      totalWorkingHours: payload.meta.company_total_working_hours_on_month
    }
  }
}

const actions = {
  getGroupReport({ commit }, params) {
    const requestPrams = { ...params, date_type: params.date_type || 'range' }

    return groupsRepository.getGroupReport(requestPrams)
      .then(response => {
        commit(FETCH_GROUP_REPORT, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getPersonalReport({ commit }, params) {
    const requestPrams = { ...params, date_type: params.date_type || 'range' }

    return groupsRepository.getPersonalReport(requestPrams)
      .then(response => {
        commit(FETCH_PERSONAL_REPORT, response.data)
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
