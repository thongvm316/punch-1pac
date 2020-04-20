import { FETCH_HOLIDAYS, DELETE_HOLIDAY, CREATE_HOLIDAY, UPDATE_HOLIDAY, UPDATE_HOLIDAY_ERRORS, CLEAR_HOLIDAY_ERRORS, IMPORT_NATIONAL_HOLIDAYS } from '../mutation-types.js'
import Repositories from '@/repository'

const companySettingsRepository = Repositories.get('companySettings')

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
    const params = { year }

    return companySettingsRepository.getHolidays(params)
      .then(response => {
        commit(FETCH_HOLIDAYS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteHoliday({ commit }, holidayID) {
    return companySettingsRepository.deleteHoliday(holidayID)
      .then(response => {
        commit(DELETE_HOLIDAY, holidayID)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  createHoliday({ commit }, data) {
    const requestData = { holiday: data }

    return companySettingsRepository.createHoliday(requestData)
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
    const requestData = { holiday: data.updateParams }

    return companySettingsRepository.updateHoliday(data.holidayID, requestData)
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
    const requestData = { country }

    return companySettingsRepository.importNationalHolidays(requestData)
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
