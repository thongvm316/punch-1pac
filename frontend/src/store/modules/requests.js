import { ADD_REQUEST, UPDATE_REQUEST, RECEIVE_REQUESTS, DELETE_REQUEST, UPDATE_REQUEST_ERRORS, CLEAR_REQUEST_ERRORS } from '../mutation-types.js'
import Repositories from '@/repository'

const requestsRepository = Repositories.get('requests')

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
    const requestParams = Object.assign(state.params, params, { per_page: 1000 })

    return requestsRepository.getRequests(requestParams)
      .then(response => {
        commit(RECEIVE_REQUESTS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  addRequest({ commit }, params = {}) {
    const data = { request: params }

    return requestsRepository.addRequest(data)
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
    const data = { request: request.params }

    return requestsRepository.updateRequest(request.id, data)
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
    return requestsRepository.deleteRequest(id)
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
