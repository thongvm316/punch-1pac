import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
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
  }
}

const actions = {
  fetchBusinessDays ({ commit }) {
    axios.get('/business_days')
         .then((response) => commit(types.FETCH_BUSINESS_DAYS, response.data))
  },

  addBusinessDay ({ commit }, data) {
    axios.post('/business_days', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.ADD_BUSINESS_DAY, response.data))
  },

  deleteBusinessDay ({ commit }, businessDayId) {
    axios.delete(`/business_days/${businessDayId}`)
         .then((response) => commit(types.DELETE_BUSINESS_DAY, businessDayId))
  },

  updateBusinessDay ({ commit }, data) {
    axios.put(`/business_days/${data.businessDayId}`, data.updateParams, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.UPDATE_BUSINESS_DAY, response.data))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
