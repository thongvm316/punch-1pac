import {
  RECEIVE_GROUP_REQUESTS,
  APPROVE_GROUP_REQUEST,
  REJECT_GROUP_REQUEST,
  REJECT_GROUP_REQUEST_ERRORS,
  CLEAR_REJECT_GROUP_REQUEST_ERRORS
} from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  errors: {},
  pager: {},
  requests: []
}

const mutations = {
  [RECEIVE_GROUP_REQUESTS](state, payload) {
    state.pager = payload.meta
    state.requests = payload.requests
  },

  [APPROVE_GROUP_REQUEST](state, requestId) {
    const index = state.requests.findIndex(request => request.id === requestId)
    state.requests[index].status = 'approved'
  },

  [REJECT_GROUP_REQUEST](state, params) {
    const index = state.requests.findIndex(request => request.id === params.requestId)
    Object.assign(state.requests[index], {
      status: 'rejected',
      admin: params.admin,
      admin_reason: params.admin_reason
    })
  },

  [REJECT_GROUP_REQUEST_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_REJECT_GROUP_REQUEST_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  getRequests({ commit }, params = {}) {
    return callApi({
      method: 'get',
      url: '/requests',
      params: { ...params, date_type: params.date_type || 'range' }
    })
      .then(response => {
        commit(RECEIVE_GROUP_REQUESTS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  approveRequest({ commit }, requestId) {
    return callApi({ method: 'post', url: `/requests/${requestId}/approve` })
      .then(response => {
        commit(APPROVE_GROUP_REQUEST, requestId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  rejectRequest({ commit }, params) {
    return callApi({
      method: 'post',
      url: `/requests/${params.requestId}/reject`,
      data: {
        request: { admin_reason: params.admin_reason }
      }
    })
      .then(response => {
        commit(REJECT_GROUP_REQUEST, params)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(REJECT_GROUP_REQUEST_ERRORS, error.response.data)
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
