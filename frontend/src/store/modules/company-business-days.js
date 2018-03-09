import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  businessDays: []
}

const mutations = {
  [types.FETCH_BUSINESS_DAYS] (state, payload) {
    state.businessDays = payload
  },

  [types.ADD_BUSINESS_DAY] (state, payload) {
    state.businessDays.push(payload)
  },

  [types.DELETE_BUSINESS_DAY] (state, businessDayId) {
    state.businessDays = state.businessDays.filter(businessDay => businessDay.id !== businessDayId)
  },

  [types.UPDATE_BUSINESS_DAY] (state, payload) {
    const index = state.businessDays.findIndex(businessDay => businessDay.id === payload.id)
    state.businessDays[index] = payload
  },

  [types.UPDATE_BUSINESS_DAY_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_BUSINESS_DAY_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  fetchBusinessDays ({ commit }) {
    return axios.get('/business_days')
                .then(response => {
                  commit(types.FETCH_BUSINESS_DAYS, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  addBusinessDay ({ commit }, params) {
    return axios.post('/business_days', { business_day: params }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.ADD_BUSINESS_DAY, response.data)
                  return response
                })
                .catch(error => {
                  if (error.response && error.response.status === 422) commit(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
                  throw error
                })
  },

  deleteBusinessDay ({ commit }, businessDayId) {
    return axios.delete(`/business_days/${businessDayId}`)
                .then(response => {
                  commit(types.DELETE_BUSINESS_DAY, businessDayId)
                  return response
                })
                .catch(error => { throw error })
  },

  updateBusinessDay ({ commit }, params) {
    return axios.put(`/business_days/${params.businessDayId}`, { business_day: params.updateParams }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.UPDATE_BUSINESS_DAY, response.data)
                  return response
                })
                .catch(error => {
                  if (error.response && error.response.status === 422) commit(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
                  throw error
                })
  },

  clearBusinessDayErrors ({ commit }) {
    commit(types.CLEAR_BUSINESS_DAY_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
