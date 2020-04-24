import { FETCH_IPS, DELETE_IP, CREATE_IP, UPDATE_IP, UPDATE_IP_ERRORS, CLEAR_IP_ERRORS } from '../mutation-types.js'
import Repository from '@/repository'

const companySettingsRepository = Repository.get('companySettings')

const state = {
  allowedIPs: [],
  errors: {}
}

const mutations = {
  [FETCH_IPS](state, payload) {
    state.allowedIPs = payload
  },

  [DELETE_IP](state, payload) {
    state.allowedIPs = state.allowedIPs.filter(ip => ip.id !== payload)
  },

  [CREATE_IP](state, payload) {
    state.allowedIPs.push(payload)
  },

  [UPDATE_IP](state, payload) {
    const index = state.allowedIPs.findIndex(ip => ip.id === payload.id)
    state.allowedIPs.splice(index, 1, payload)
  },

  [UPDATE_IP_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_IP_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  fetchIPs({ commit }) {
    return companySettingsRepository.getIPs()
      .then(response => {
        commit(FETCH_IPS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  createIP({ commit }, data) {
    const requestData = { allowed_ip: data }

    return companySettingsRepository.createIP(requestData)
      .then(response => {
        commit(CREATE_IP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_IP_ERRORS, error.response.data)
        throw error
      })
  },

  updateIP({ commit }, data) {
    const requestData = { allowed_ip: data }

    return companySettingsRepository.updateIP(data.id, requestData)
      .then(response => {
        commit(UPDATE_IP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_IP_ERRORS, error.response.data)
        throw error
      })
  },

  deleteIP({ commit }, id) {
    return companySettingsRepository.deleteIP(id)
      .then(response => {
        commit(DELETE_IP, id)
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
  mutations,
  actions
}
