import { ADD_REQUEST, UPDATE_REQUEST, RECEIVE_REQUESTS, DELETE_REQUEST, UPDATE_REQUEST_ERRORS, CLEAR_REQUEST_ERRORS } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  errors: {},
  params: {},
  pager: {},
  requests: []
}

const mutations = {
  [ADD_REQUEST](state, payload) {
    state.requests.push(payload)
  },

  [UPDATE_REQUEST](state, payload) {
    const index = state.requests.findIndex(request => request.id === payload.id)
    state.requests[index] = payload
  },

  [RECEIVE_REQUESTS](state, payload) {
    state.pager = payload.meta
    state.requests = payload.requests
  },

  [DELETE_REQUEST](state, requestId) {
    state.requests = state.requests.filter(req => req.id !== requestId)
  },

  [UPDATE_REQUEST_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_REQUEST_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  getRequests({ commit, state }, params = {}) {
    return callApi({
      method: 'get',
      url: '/requests',
      params: Object.assign(state.params, params, { per_page: 1000 })
    })
      .then(response => {
        commit(RECEIVE_REQUESTS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  addRequest({ commit }, params = {}) {
    return callApi({
      method: 'post',
      url: '/requests',
      data: { request: params },
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        commit(ADD_REQUEST, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_REQUEST_ERRORS, error.response.data)
        throw error
      })
  },

  updateRequest({ commit }, request) {
    return callApi({
      method: 'patch',
      url: `/requests/${request.id}`,
      data: { request: request.params },
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        commit(UPDATE_REQUEST, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_REQUEST_ERRORS, error.response.data)
        throw error
      })
  },

  deleteRequest({ commit }, id) {
    return callApi({
      method: 'delete',
      url: `/requests/${id}`
    })
      .then(response => {
        commit(DELETE_REQUEST, id)
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
