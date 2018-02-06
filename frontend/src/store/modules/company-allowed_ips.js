import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  allowedIPs: [],
  errors: {}
}

const mutations = {
  [types.FETCH_IPS] (state, payload) {
    state.allowedIPs = payload
  },
  [types.DELETE_IP] (state, payload) {
    state.allowedIPs = state.allowedIPs.filter(ip => ip.id !== payload)
  },
  [types.CREATE_IP] (state, payload) {
    state.allowedIPs.push(payload)
  },
  [types.UPDATE_IP] (state, payload) {
    const index = state.allowedIPs.findIndex(ip => ip.id === payload.id)
    state.allowedIPs.splice(index, 1, payload)
  },
  [types.UPDATE_IP_ERRORS] (state, payload) {
    state.errors = payload.errors
  },
  [types.CLEAR_IP_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  fetchIPs ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/allowed_ips')
         .then((response) => {
           commit(types.FETCH_IPS, response.data)
           resolve(response)
         })
         .catch((error) => reject(error))
    })
  },
  deleteIP ({ commit }, ipID) {
    axios.delete(`/allowed_ips/${ipID}`)
         .then((response) => commit(types.DELETE_IP, ipID))
  },
  createIP ({ commit }, data) {
    axios.post('/allowed_ips/', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.CREATE_IP, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_IP_ERRORS, error.response.data)
         })
  },
  updateIP ({ commit }, data) {
    axios.put(`/allowed_ips/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.UPDATE_IP, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_IP_ERRORS, error.response.data)
         })
  },
  clearIPErrors ({ commit }) {
    commit(types.CLEAR_IP_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
