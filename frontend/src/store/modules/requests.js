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

  [types.DELETE_REQUEST] (state, requestId) {
    state.requests = state.requests.filter(req => req.id !== requestId)
  },

  [types.UPDATE_REQUEST_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.APPROVE_REQUEST] (state, requestId) {
    const index = state.requests.findIndex(request => request.id === requestId)
    state.requests[index].status = 'approved'
  },

  [types.REJECT_REQUEST] (state, requestId) {
    const index = state.requests.findIndex(request => request.id === requestId)
    state.requests[index].status = 'rejected'
  },

  [types.CLEAR_REQUEST_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  getRequests ({ commit, state }, params = {}) {
    return axios.get('/requests', { params: Object.assign(state.params, params) })
                .then(response => {
                  commit(types.RECEIVE_REQUESTS, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  addRequest ({ commit }, params = {}) {
    return axios.post('/requests', { request: params }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.ADD_REQUEST, response.data)
                  return response
                })
                .catch(error => {
                  if (error.response && error.response.status === 422) commit(types.UPDATE_REQUEST_ERRORS, error.response.data)
                  throw error
                })
  },

  updateRequest ({ commit }, request) {
    return axios.patch(`/requests/${request.id}`, { request: request.params }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.UPDATE_REQUEST, response.data)
                  return response
                })
                .catch(error => {
                  if (error.response && error.response.status === 422) commit(types.UPDATE_REQUEST_ERRORS, error.response.data)
                  throw error
                })
  },

  deleteRequest ({ commit }, id) {
    return axios.delete(`/requests/${id}`)
                .then(response => {
                  commit(types.DELETE_REQUEST, id)
                  return response
                })
                .catch(error => { throw error })
  },

  approveRequest ({ commit }, requestId) {
    return axios.post(`/requests/${requestId}/approve`)
                .then(response => {
                  commit(types.APPROVE_REQUEST, requestId)
                  return response
                })
                .catch(error => { throw error })
  },

  rejectRequest ({ commit }, requestId) {
    return axios.post(`/requests/${requestId}/reject`)
                .then(response => {
                  commit(types.REJECT_REQUEST, requestId)
                  return response
                })
                .catch(error => { throw error })
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
