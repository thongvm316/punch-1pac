import { FETCH_BUSINESS_DAYS, ADD_BUSINESS_DAY, DELETE_BUSINESS_DAY, UPDATE_BUSINESS_DAY, UPDATE_BUSINESS_DAY_ERRORS, CLEAR_BUSINESS_DAY_ERRORS } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  errors: {},
  businessDays: []
}

const mutations = {
  [FETCH_BUSINESS_DAYS](state, payload) {
    state.businessDays = payload
  },

  [ADD_BUSINESS_DAY](state, payload) {
    state.businessDays.push(payload)
  },

  [DELETE_BUSINESS_DAY](state, businessDayId) {
    state.businessDays = state.businessDays.filter(businessDay => businessDay.id !== businessDayId)
  },

  [UPDATE_BUSINESS_DAY](state, payload) {
    const index = state.businessDays.findIndex(businessDay => businessDay.id === payload.id)
    state.businessDays[index] = payload
  },

  [UPDATE_BUSINESS_DAY_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_BUSINESS_DAY_ERRORS](state) {
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
        commit(FETCH_BUSINESS_DAYS, response.data)
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
        commit(ADD_BUSINESS_DAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
        throw error
      })
  },

  deleteBusinessDay({ commit }, businessDayId) {
    return callApi({
      method: 'delete',
      url: `/business_days/${businessDayId}`
    })
      .then(response => {
        commit(DELETE_BUSINESS_DAY, businessDayId)
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
        commit(UPDATE_BUSINESS_DAY, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
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
