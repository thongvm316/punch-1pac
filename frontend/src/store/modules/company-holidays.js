import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  holidays: [],
  errors: {}
}

const getters = {
  filterHolidays: state => query => {
    const regex = new RegExp(`${query}`, 'gi')
    return query ? state.holidays.filter(holiday => holiday.name.match(regex)) : state.holidays
  }
}

const mutations = {
  [types.FETCH_HOLIDAYS](state, payload) {
    state.holidays = payload
  },

  [types.DELETE_HOLIDAY](state, payload) {
    state.holidays = state.holidays.filter(holiday => holiday.id !== payload)
  },

  [types.CREATE_HOLIDAY](state, payload) {
    state.holidays.push(payload)
  },

  [types.UPDATE_HOLIDAY](state, payload) {
    const index = state.holidays.findIndex(holiday => holiday.id === payload.id)
    state.holidays.splice(index, 1, payload)
  },

  [types.UPDATE_HOLIDAY_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_HOLIDAY_ERRORS](state) {
    state.errors = {}
  },

  [types.IMPORT_NATIONAL_HOLIDAYS](state, payload) {
    state.holidays = state.holidays.concat(payload)
  }
}

const actions = {
  fetchHolidays({ commit }, year) {
    return callApi({ method: 'get', url: '/holidays', params: { year } })
      .then(response => {
        commit(types.FETCH_HOLIDAYS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteHoliday({ commit }, holidayID) {
    return callApi({ method: 'delete', url: `/holidays/${holidayID}` })
      .then(response => {
        commit(types.DELETE_HOLIDAY, holidayID)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  createHoliday({ commit }, data) {
    return callApi({ method: 'post', url: '/holidays', data: { holiday: data } })
      .then(response => {
        commit(types.CREATE_HOLIDAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_HOLIDAY_ERRORS, error.response.data)
        throw error
      })
  },

  updateHoliday({ commit }, data) {
    return callApi({ method: 'put', url: `/holidays/${data.holidayID}`, data: { holiday: data.updateParams } })
      .then(response => {
        commit(types.UPDATE_HOLIDAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_HOLIDAY_ERRORS, error.response.data)
        throw error
      })
  },

  clearHolidayErrors({ commit }) {
    commit(types.CLEAR_HOLIDAY_ERRORS)
  },

  importNationalHolidays({ commit }, country) {
    if (!country) return
    return callApi({ method: 'post', url: '/holidays/import', data: { country } })
      .then(response => {
        commit(types.IMPORT_NATIONAL_HOLIDAYS, response.data)
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
