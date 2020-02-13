import { FETCH_CALENDAR_ATTENDANCES } from '../mutation-types'
import callApi from '../api-caller'

const state = {
  attendances: [],
  holidays: []
}

const mutations = {
  [FETCH_CALENDAR_ATTENDANCES](state, payload) {
    state.attendances = payload.attendances
    state.holidays = payload.holidays
  }
}

const actions = {
  getCalendarAttendances({ commit }, day) {
    return callApi({ method: 'get', url: '/attendances/calendar', params: { date: day } })
      .then(response => {
        commit(FETCH_CALENDAR_ATTENDANCES, response.data)
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
