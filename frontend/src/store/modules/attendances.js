import { RECEIVE_ATTENDANCES } from '../mutation-types.js'
import Repository from '@/repository'

const attendancesRepository = Repository.get('attendances')

const state = {
  params: {},
  attendances: [],
  forgotPunchInDays: null
}

const getters = {
  formattedAttendances(state, getters, rootState) {
    if (!state.params.status || (state.params.status && state.params.status !== 'annual_leave')) return state.attendances

    let attendances = state.attendances
    let forgotPunchInDays = state.forgotPunchInDays || rootState.initialStates.currentUser.forgot_punch_in_days_in_month

    const insertSorted = function(forgotDate) {
      let i
      if (forgotDate > state.params.to_date || forgotDate < state.params.from_date) return

      for (i = attendances.length - 1; i >= 0 && attendances[i].day < forgotDate; i--) {
        attendances[i + 1] = attendances[i]
      }

      attendances[i + 1] = {
        attended_at: null,
        attending_status: null,
        day: forgotDate,
        id: null,
        leaving_status: null,
        left_at: null,
        off_status: 'leave',
        user: rootState.initialStates.currentUser,
        working_hours: 0
      }
    }

    forgotPunchInDays.forEach(date => insertSorted(date))
    return attendances
  }
}

const mutations = {
  [RECEIVE_ATTENDANCES](state, payload) {
    state.attendances = payload.attendances
    state.forgotPunchInDays = payload.meta.forgot_punch_in_days
  }
}

const actions = {
  getAttendances({ commit, state }, params = {}) {
    const requestParams = Object.assign(state.params, params, { per_page: 1000 })

    return attendancesRepository.getAttendances(requestParams)
      .then(response => {
        commit(RECEIVE_ATTENDANCES, response.data)
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
  getters,
  mutations,
  actions
}
