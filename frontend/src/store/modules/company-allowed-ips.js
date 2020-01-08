import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  allowedIPs: [],
  errors: {}
}

const mutations = {
  [types.FETCH_IPS](state, payload) {
    state.allowedIPs = payload
  },

  [types.DELETE_IP](state, payload) {
    state.allowedIPs = state.allowedIPs.filter(ip => ip.id !== payload)
  },

  [types.CREATE_IP](state, payload) {
    state.allowedIPs.push(payload)
  },

  [types.UPDATE_IP](state, payload) {
    const index = state.allowedIPs.findIndex(ip => ip.id === payload.id)
    state.allowedIPs.splice(index, 1, payload)
  },

  [types.UPDATE_IP_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_IP_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  fetchIPs({ commit }) {
    return callApi({ method: 'get', url: '/allowed_ips' })
      .then(response => {
        commit(types.FETCH_IPS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteIP({ commit }, id) {
    return callApi({ method: 'delete', url: `/allowed_ips/${id}` })
      .then(response => {
        commit(types.DELETE_IP, id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  createIP({ commit }, data) {
    return callApi({ method: 'post', url: '/allowed_ips/', data: { allowed_ip: data } })
      .then(response => {
        commit(types.CREATE_IP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_IP_ERRORS, error.response.data)
        throw error
      })
  },

  updateIP({ commit }, data) {
    return callApi({ method: 'put', url: `/allowed_ips/${data.id}`, data: { allowed_ip: data } })
      .then(response => {
        commit(types.UPDATE_IP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_IP_ERRORS, error.response.data)
        throw error
      })
  },

  clearIPErrors({ commit }) {
    commit(types.CLEAR_IP_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
