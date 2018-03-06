import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  holidays: [],
  errors: {}
}

const getters = {
  filterHolidays (state) {
    return function (query) {
      const regex = new RegExp(`${query}`, 'g')
      return query ? state.holidays.filter(holiday => holiday.name.match(regex)) : state.holidays
    }
  }
}

const mutations = {
  [types.FETCH_HOLIDAYS] (state, payload) {
    state.holidays = payload
  },

  [types.DELETE_HOLIDAY] (state, payload) {
    state.holidays = state.holidays.filter(holiday => holiday.id !== payload)
  },

  [types.CREATE_HOLIDAY] (state, payload) {
    state.holidays.push(payload)
  },

  [types.UPDATE_HOLIDAY] (state, payload) {
    const index = state.holidays.findIndex(holiday => holiday.id === payload.id)
    state.holidays.splice(index, 1, payload)
  },

  [types.UPDATE_HOLIDAY_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_HOLIDAY_ERRORS] (state) {
    state.errors = {}
  },

  [types.IMPORT_NATIONAL_HOLIDAYS] (state, payload) {
    state.holidays = state.holidays.concat(payload)
  }
}

const actions = {
  fetchHolidays ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/holidays')
           .then((response) => {
             commit(types.FETCH_HOLIDAYS, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  },

  deleteHoliday ({ commit }, holidayID) {
    axios.delete(`/holidays/${holidayID}`)
         .then((response) => commit(types.DELETE_HOLIDAY, holidayID))
  },

  createHoliday ({ commit }, data) {
    axios.post(`/holidays`, { holiday: data }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.CREATE_HOLIDAY, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_HOLIDAY_ERRORS, error.response.data)
         })
  },

  updateHoliday ({ commit }, data) {
    axios.put(`/holidays/${data.holidayID}`, { holiday: data.updateParams }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.UPDATE_HOLIDAY, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_HOLIDAY_ERRORS, error.response.data)
         })
  },

  clearHolidayErrors ({ commit }) {
    commit(types.CLEAR_HOLIDAY_ERRORS)
  },

  importNationalHolidays ({ commit }, country) {
    if (!country) return
    axios.post('/holidays/import', { country: country }, { headers: { 'Content-Type': 'application/json' } })
         .then(response => commit(types.IMPORT_NATIONAL_HOLIDAYS, response.data))
         .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
