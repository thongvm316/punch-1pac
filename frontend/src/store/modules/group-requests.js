import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  params: {},
  pager: {},
  requests: []
}

const mutations = {
  [types.RECEIVE_GROUP_REQUESTS](state, payload) {
    state.pager = payload.meta
    state.requests = payload.requests
  },

  [types.APPROVE_GROUP_REQUEST](state, requestId) {
    const index = state.requests.findIndex(request => request.id === requestId)
    state.requests[index].status = 'approved'
  },

  [types.REJECT_GROUP_REQUEST](state, params) {
    const index = state.requests.findIndex(request => request.id === params.requestId)
    Object.assign(state.requests[index], {
      status: 'rejected',
      admin: params.admin,
      admin_reason: params.admin_reason
    })
  },

  [types.REJECT_GROUP_REQUEST_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_REJECT_GROUP_REQUEST_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  getRequests({ commit, state }, params = {}) {
    return axios
      .get('/requests', { params: Object.assign(state.params, params) })
      .then(response => {
        commit(types.RECEIVE_GROUP_REQUESTS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  approveRequest({ commit }, requestId) {
    return axios
      .post(`/requests/${requestId}/approve`)
      .then(response => {
        commit(types.APPROVE_GROUP_REQUEST, requestId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  rejectRequest({ commit }, params) {
    return axios
      .post(`/requests/${params.requestId}/reject`, { request: { admin_reason: params.admin_reason } })
      .then(response => {
        commit(types.REJECT_GROUP_REQUEST, params)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.REJECT_GROUP_REQUEST_ERRORS, error.response.data)
        throw error
      })
  },

  clearRejectRequestErrors({ commit }) {
    commit(types.CLEAR_REJECT_GROUP_REQUEST_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
