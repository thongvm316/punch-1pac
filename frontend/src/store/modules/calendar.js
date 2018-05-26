import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  attendances: [],
  holidays: []
}

const mutations = {
  [types.FETCH_CALENDAR_ATTENDANCES](state, payload) {
    state.attendances = payload.attendances
    state.holidays = payload.holidays
  }
}

const actions = {
  getCalendarAttendances({ commit }, day) {
    return axios
      .get('/attendances/calendar', { params: { day: day } })
      .then(response => {
        commit(types.FETCH_CALENDAR_ATTENDANCES, response.data)
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
