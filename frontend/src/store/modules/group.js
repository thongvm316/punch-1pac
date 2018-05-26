import * as types from '../mutation-types.js'
import axios from 'axios'
import 'formdata-polyfill'

const state = {
  errors: {},
  group: {},
  usersNotInGroup: []
}

const mutations = {
  [types.RECEIVE_GROUP](state, payload) {
    state.group = payload
  },

  [types.UPDATE_GROUP](state, payload) {
    state.group = payload
  },

  [types.ADD_GROUP_USER](state, user) {
    state.group.users.push(user)
    state.usersNotInGroup = state.usersNotInGroup.filter(u => u.id !== user.id)
  },

  [types.DEACTIVATE_GROUP_USER](state, userId) {
    const index = state.group.users.findIndex(user => user.id === userId)
    state.group.users[index].activated = false
  },

  [types.ACTIVATE_GROUP_USER](state, userId) {
    const index = state.group.users.findIndex(user => user.id === userId)
    state.group.users[index].activated = true
  },

  [types.REMOVE_GROUP_USER](state, payload) {
    state.group.users = state.group.users.filter(user => user.id !== payload)
  },

  [types.UPDATE_GROUP_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_GROUP_ERRORS](state) {
    state.errors = {}
  },

  [types.FETCH_USERS_NOT_IN_GROUP](state, payload) {
    state.usersNotInGroup = payload.users
  }
}

const actions = {
  getGroup({ commit, state }, id) {
    return axios
      .get(`/groups/${id}`)
      .then(response => {
        commit(types.RECEIVE_GROUP, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  updateGroup({ commit }, params) {
    let formData = new FormData()
    Object.keys(params.editParams).forEach(key => formData.set(`group[${key}]`, params.editParams[key] || ''))

    return axios
      .put(`/groups/${params.groupId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        commit(types.UPDATE_GROUP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(types.UPDATE_GROUP_ERRORS, error.response.data)
        throw error
      })
  },

  addGroupUser({ commit }, params) {
    return axios
      .post(`/groups/${params.groupId}/add_user`, { user_id: params.user.id }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        commit(types.ADD_GROUP_USER, params.user)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deactivateGroupUser({ commit }, userId) {
    return axios
      .post(`/users/${userId}/deactivate`, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        commit(types.DEACTIVATE_GROUP_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  activateGroupUser({ commit }, userId) {
    return axios
      .post(`/users/${userId}/activate`, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        commit(types.ACTIVATE_GROUP_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  removeGroupUser({ commit }, params) {
    return axios
      .delete(`/groups/${params.groupId}/remove_user?user_id=${params.userId}`)
      .then(response => {
        commit(types.REMOVE_GROUP_USER, params.userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getUsersNotInGroup({ commit }, groupId) {
    return axios
      .get(`/users`, { params: { not_in_group_id: groupId, per_page: 1000 } })
      .then(response => {
        commit(types.FETCH_USERS_NOT_IN_GROUP, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  clearGroupErrors({ commit }) {
    commit(types.CLEAR_GROUP_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
