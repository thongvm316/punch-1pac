import { FETCH_CALENDAR_ATTENDANCES } from '../mutation-types'
import Repository from '@/repository'

const attendancesRepository = Repository.get('attendances')

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
  getCalendarAttendances({ commit }, date) {
    const requestParams = { date }

    return attendancesRepository.getCalendarAttendances(requestParams)
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
