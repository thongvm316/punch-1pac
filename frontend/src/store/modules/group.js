import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  group: {},
  filteredUsers: [],
  selectedUser: {}
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
  },

  [types.FILTERED_USERS] (state, payload) {
    state.filteredUsers = payload.users
  },

  [types.SELECTED_USER] (state, payload) {
    state.selectedUser = payload
  }
}

const actions = {
  getGroup ({ commit, state }, id) {
    return axios.get(`/groups/${id}`)
                .then(response => {
                  commit(types.RECEIVE_GROUP, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  updateGroup ({ commit }, params) {
    return axios.put(`/groups/${params.groupId}`, { group: params.editParams }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.UPDATE_GROUP, response.data)
                  return response
                })
                .catch(error => {
                  if (error.response && error.response.status === 422) commit(types.UPDATE_GROUP_ERRORS, error.response.data)
                  else throw error
                })
  },

  addGroupUser ({ commit }, params) {
    return axios.post(`/groups/${params.groupId}/add_user?user_id=${params.userId}`, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                  commit(types.ADD_GROUP_USER, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  removeGroupUser ({ commit }, params) {
    return axios.delete(`/groups/${params.groupId}/remove_user?user_id=${params.userId}`)
                .then(response => {
                  commit(types.REMOVE_GROUP_USER, params.userId)
                  return response
                })
                .catch(error => { throw error })
  },

  filterUsersByEmail ({ commit }, userEmail) {
    return axios.get(`/users?email=${userEmail}`, { timeout: 5000 })
                .then(response => {
                  commit(types.FILTERED_USERS, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  selectUser ({ commit }, user) {
    commit(types.SELECTED_USER, user)
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
