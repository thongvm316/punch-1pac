import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  customHolidays: [],
  errors: {}
}

const mutations = {
  [types.FETCH_CUSTOM_HOLIDAYS] (state, payload) {
    state.customHolidays = payload
  },
  [types.DELETE_CUSTOM_HOLIDAY] (state, payload) {
    state.customHolidays = state.customHolidays.filter(customHoliday => customHoliday.id !== payload)
  },
  [types.CREATE_CUSTOM_HOLIDAY] (state, payload) {
    state.customHolidays.push(payload)
  },
  [types.UPDATE_CUSTOM_HOLIDAY] (state, payload) {
    const index = state.customHolidays.findIndex(customHoliday => customHoliday.id === payload.id)
    state.customHolidays.splice(index, 1, payload)
  },
  [types.UPDATE_CUSTOM_HOLIDAY_ERRORS] (state, payload) {
    state.errors = payload.errors
  },
  [types.CLEAR_CUSTOM_HOLIDAY_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  fetchCustomHolidays ({ commit }) {
    axios.get('/custom_holidays')
         .then((response) => commit(types.FETCH_CUSTOM_HOLIDAYS, response.data))
         .catch((error) => reject(error))
  },
  deleteCustomHoliday ({ commit }, customHolidayID) {
    axios.delete(`/custom_holidays/${customHolidayID}`)
         .then((response) => commit(types.DELETE_CUSTOM_HOLIDAY, customHolidayID))
  },
  createCustomHoliday ({ commit }, data) {
    axios.post(`/custom_holidays`, { holiday: data }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.CREATE_CUSTOM_HOLIDAY, response.data))
  },
  updateCustomHoliday ({ commit }, data) {
    axios.put(`/custom_holidays/${data.customHolidayID}`, { holiday: data.updateParams }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.UPDATE_CUSTOM_HOLIDAY, response.data))
         .catch((error) => {
            if (error.response && error.response.status === 422) commit(types.UPDATE_CUSTOM_HOLIDAY_ERRORS, error.response.data)
         })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
