import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  params: {},
  pager: {},
  requests: []
}

const mutations = {
  [types.ADD_REQUEST] (state, payload) {
    state.requests.push(payload)
  },

  [types.UPDATE_REQUEST] (state, payload) {
    const index = state.requests.findIndex(request => request.id === payload.id)
    state.requests[index] = payload
  },

  [types.RECEIVE_REQUESTS] (state, payload) {
    state.pager = payload.meta
    state.requests = payload.requests
  },

  [types.DELETE_REQUEST] (state, payload) {
    state.requests = state.requests.filter(req => req.id !== payload.id)
  },

  [types.UPDATE_REQUEST_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_REQUEST_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  getRequests ({ commit, state }, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get('/requests', { params: Object.assign(state.params, params) })
           .then((response) => {
             commit(types.RECEIVE_REQUESTS, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  },

  addRequest ({ commit }, params = {}) {
    axios.post('/requests', { request: params }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => { commit(types.ADD_REQUEST, response.data) })
  },

  updateRequest ({ commit }, request) {
    axios.patch(`/requests/${request.id}`, { request: request.params }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => { commit(types.UPDATE_REQUEST, response.data) })
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_REQUEST_ERRORS, error.response.data)
         })
  },

  deleteRequest ({ commit }, id) {
    axios.delete(`/requests/${id}`)
         .then(response => { commit(types.DELETE_REQUEST, response.data) })
  },

  clearRequestErrors ({ commit }) {
    commit(types.CLEAR_REQUEST_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
