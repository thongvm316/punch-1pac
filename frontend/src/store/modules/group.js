import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  group: {}
}

const mutations = {
  [types.RECEIVE_GROUP] (state, payload) {
    state.group = payload
  },

  [types.UPDATE_GROUP] (state, payload) {
    state.group.name = payload.name
  },

  [types.ADD_GROUP_USER] (state, payload) {
    state.group.users.push(payload)
  },

  [types.REMOVE_GROUP_USER] (state, payload) {
    state.group.users = state.group.users.filter(user => user.id !== payload)
  },

  [types.UPDATE_GROUP_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_GROUP_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  getGroup ({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`/groups/${id}`)
           .then((response) => {
             commit(types.RECEIVE_GROUP, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  },

  updateGroup ({ commit }, params) {
    axios.put(`/groups/${params.groupId}`, { group: params.editParams }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.UPDATE_GROUP, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_GROUP_ERRORS, error.response.data)
         })
  },

  addGroupUser ({ commit }, params) {
    axios.post(`/groups/${params.groupId}/add_user?user_id=${params.userId}`, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.ADD_GROUP_USER, response.data))
  },

  removeGroupUser ({ commit }, params) {
    axios.delete(`/groups/${params.groupId}/remove_user?user_id=${params.userId}`)
         .then((response) => commit(types.REMOVE_GROUP_USER, params.userId))
  },

  clearGroupErrors ({ commit }) {
    commit(types.CLEAR_GROUP_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
