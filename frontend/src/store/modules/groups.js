import * as types from '../mutation-types.js'
import axios from 'axios'
import 'formdata-polyfill'

const state = {
  errors: {},
  groups: []
}

const getters = {
  filterGroups(state) {
    return function(query) {
      const regex = new RegExp(`${query.trim()}`, 'gi')
      return query ? state.groups.filter(group => group.name.match(regex)) : state.groups
    }
  }
}

const mutations = {
  [types.RECEIVE_GROUPS](state, payload) {
    state.groups = payload
  },

  [types.ADD_GROUP](state, payload) {
    state.groups.push(payload)
  },

  [types.UPDATE_GROUPS_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_GROUPS_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  getGroups({ commit, state }) {
    return axios
      .get('/groups')
      .then(response => {
        commit(types.RECEIVE_GROUPS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  addGroup({ commit }, params) {
    let formData = new FormData()
    Object.keys(params).forEach(key => formData.set(`group[${key}]`, params[key] || ''))

    return axios
      .post('/groups', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        commit(types.ADD_GROUP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_GROUPS_ERRORS, error.response.data)
        throw error
      })
  },

  clearGroupsErrors({ commit }) {
    commit(types.CLEAR_GROUPS_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
