import { FETCH_HOLIDAYS, DELETE_HOLIDAY, CREATE_HOLIDAY, UPDATE_HOLIDAY, UPDATE_HOLIDAY_ERRORS, CLEAR_HOLIDAY_ERRORS, IMPORT_NATIONAL_HOLIDAYS } from '../mutation-types.js'
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
  [FETCH_HOLIDAYS](state, payload) {
    state.holidays = payload
  },

  [DELETE_HOLIDAY](state, payload) {
    state.holidays = state.holidays.filter(holiday => holiday.id !== payload)
  },

  [CREATE_HOLIDAY](state, payload) {
    state.holidays.push(payload)
  },

  [UPDATE_HOLIDAY](state, payload) {
    const index = state.holidays.findIndex(holiday => holiday.id === payload.id)
    state.holidays.splice(index, 1, payload)
  },

  [UPDATE_HOLIDAY_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_HOLIDAY_ERRORS](state) {
    state.errors = {}
  },

  [IMPORT_NATIONAL_HOLIDAYS](state, payload) {
    state.holidays = state.holidays.concat(payload)
  }
}

const actions = {
  fetchHolidays({ commit }, year) {
    return callApi({ method: 'get', url: '/holidays', params: { year } })
      .then(response => {
        commit(FETCH_HOLIDAYS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteHoliday({ commit }, holidayID) {
    return callApi({ method: 'delete', url: `/holidays/${holidayID}` })
      .then(response => {
        commit(DELETE_HOLIDAY, holidayID)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  createHoliday({ commit }, data) {
    return callApi({ method: 'post', url: '/holidays', data: { holiday: data } })
      .then(response => {
        commit(CREATE_HOLIDAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_HOLIDAY_ERRORS, error.response.data)
        throw error
      })
  },

  updateHoliday({ commit }, data) {
    return callApi({ method: 'put', url: `/holidays/${data.holidayID}`, data: { holiday: data.updateParams } })
      .then(response => {
        commit(UPDATE_HOLIDAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_HOLIDAY_ERRORS, error.response.data)
        throw error
      })
  },

  importNationalHolidays({ commit }, country) {
    if (!country) return
    return callApi({ method: 'post', url: '/holidays/import', data: { country } })
      .then(response => {
        commit(IMPORT_NATIONAL_HOLIDAYS, response.data)
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
