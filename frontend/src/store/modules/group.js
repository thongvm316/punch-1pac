import * as types from '../mutation-types.js'
import axios from 'axios'
import 'formdata-polyfill'

const state = {
  errors: {},
  group: {},
  usersInGroup: []
}

const getters = {
  filterUsers(state) {
    return function(query) {
      const regex = new RegExp(`${query.trim()}`, 'gi')
      return query ? state.usersInGroup.filter(user => (user.name.match(regex) || user.email.match(regex))) : state.usersInGroup
    }
  }
}

const mutations = {
  [types.RECEIVE_GROUP](state, payload) {
    state.group = payload
  },

  [types.UPDATE_GROUP](state, payload) {
    state.group = payload
  },

  [types.ADD_GROUP_USER](state, user) {
    state.usersInGroup.push(user)
  },

  [types.DEACTIVATE_GROUP_USER](state, userId) {
    const index = state.usersInGroup.findIndex(user => user.id === userId)
    state.usersInGroup[index].activated = false
  },

  [types.ACTIVATE_GROUP_USER](state, userId) {
    const index = state.usersInGroup.findIndex(user => user.id === userId)
    state.usersInGroup[index].activated = true
  },

  [types.UPDATE_GROUP_USER](state, user) {
    const index = state.usersInGroup.findIndex(u => u.id === user.id)
    state.usersInGroup[index] = user
  },

  [types.REMOVE_GROUP_USER](state, payload) {
    state.usersInGroup = state.usersInGroup.filter(user => user.id !== payload)
  },

  [types.UPDATE_GROUP_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_GROUP_ERRORS](state) {
    state.errors = {}
  },

  [types.FETCH_USERS_IN_GROUP](state, payload) {
    state.usersInGroup = payload.users
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

  clearGroupErrors({ commit }) {
    commit(types.CLEAR_GROUP_ERRORS)
  },

  deleteGroup({ commit }, groupId) {
    return axios
      .delete(`/groups/${groupId}`)
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getUsersInGroup({ commit, state }, groupId) {
    return axios
      .get('/users', { params: { group_id: groupId, type: 'users_in_group', per_page: 1000 } })
      .then(response => {
        commit(types.FETCH_USERS_IN_GROUP, response.data)
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
  getters,
  mutations,
  actions
}
