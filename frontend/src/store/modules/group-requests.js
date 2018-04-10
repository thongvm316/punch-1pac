import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  params: {},
  pager: {},
  requests: []
}

const mutations = {
  [types.RECEIVE_GROUP_REQUESTS] (state, payload) {
    state.pager = payload.meta
    state.requests = payload.requests
  },

  [types.APPROVE_GROUP_REQUEST] (state, requestId) {
    const index = state.requests.findIndex(request => request.id === requestId)
    state.requests[index].status = 'approved'
  },

  [types.REJECT_GROUP_REQUEST] (state, requestId) {
    const index = state.requests.findIndex(request => request.id === requestId)
    state.requests[index].status = 'rejected'
  }
}

const actions = {
  getRequests ({ commit, state }, params = {}) {
    return axios.get('/requests', { params: Object.assign(state.params, params) })
                .then(response => {
                  commit(types.RECEIVE_GROUP_REQUESTS, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  approveRequest ({ commit }, requestId) {
    return axios.post(`/requests/${requestId}/approve`)
                .then(response => {
                  commit(types.APPROVE_GROUP_REQUEST, requestId)
                  return response
                })
                .catch(error => { throw error })
  },

  rejectRequest ({ commit }, requestId) {
    return axios.post(`/requests/${requestId}/reject`)
                .then(response => {
                  commit(types.REJECT_GROUP_REQUEST, requestId)
                  return response
                })
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
