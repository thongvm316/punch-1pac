import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  groups: []
}

const mutations = {
  [types.RECEIVE_GROUPS] (state, payload) {
    state.groups = payload
  },

  [types.ADD_GROUP] (state, payload) {
    state.groups.push(payload)
  },

  [types.UPDATE_GROUPS_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_GROUPS_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  getGroups ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get('/groups')
           .then((response) => {
             commit(types.RECEIVE_GROUPS, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  },

  addGroup ({ commit }, params) {
    axios.post('/groups', { group: params }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.ADD_GROUP, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_GROUPS_ERRORS, error.response.data)
         })
  },

  clearGroupsErrors ({ commit }) {
    commit(types.CLEAR_GROUPS_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
