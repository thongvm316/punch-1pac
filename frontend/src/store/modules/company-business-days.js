import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  errors: {},
  businessDays: []
}

const mutations = {
  [types.FETCH_BUSINESS_DAYS](state, payload) {
    state.businessDays = payload
  },

  [types.ADD_BUSINESS_DAY](state, payload) {
    state.businessDays.push(payload)
  },

  [types.DELETE_BUSINESS_DAY](state, businessDayId) {
    state.businessDays = state.businessDays.filter(businessDay => businessDay.id !== businessDayId)
  },

  [types.UPDATE_BUSINESS_DAY](state, payload) {
    const index = state.businessDays.findIndex(businessDay => businessDay.id === payload.id)
    state.businessDays[index] = payload
  },

  [types.UPDATE_BUSINESS_DAY_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_BUSINESS_DAY_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  fetchBusinessDays({ commit }) {
    return callApi({
      method: 'get',
      url: '/business_days'
    })
      .then(response => {
        commit(types.FETCH_BUSINESS_DAYS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  addBusinessDay({ commit }, params) {
    return callApi({
      method: 'post',
      url: '/business_days',
      data: { business_day: params }
    })
      .then(response => {
        commit(types.ADD_BUSINESS_DAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
        throw error
      })
  },

  deleteBusinessDay({ commit }, businessDayId) {
    return callApi({
      method: 'delete',
      url: `/business_days/${businessDayId}`
    })
      .then(response => {
        commit(types.DELETE_BUSINESS_DAY, businessDayId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  updateBusinessDay({ commit }, params) {
    return callApi({
      method: 'put',
      url: `/business_days/${params.businessDayId}`,
      data: { business_day: params.updateParams }
    })
      .then(response => {
        commit(types.UPDATE_BUSINESS_DAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
        throw error
      })
  },

  clearBusinessDayErrors({ commit }) {
    commit(types.CLEAR_BUSINESS_DAY_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
