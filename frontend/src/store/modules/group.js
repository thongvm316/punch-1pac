import {
  RECEIVE_GROUP,
  UPDATE_GROUP,
  ADD_GROUP_USER,
  DEACTIVATE_GROUP_USER,
  ACTIVATE_GROUP_USER,
  UPDATE_GROUP_USER,
  REMOVE_GROUP_USER,
  UPDATE_GROUP_ERRORS,
  CLEAR_GROUP_ERRORS,
  FETCH_USERS_IN_GROUP
} from '../mutation-types.js'
import callApi from '../api-caller'
import 'formdata-polyfill'

const state = {
  errors: {},
  group: {},
  usersInGroup: []
}

const getters = {
  filterUsers: state => query => {
    const regex = new RegExp(`${query.trim()}`, 'gi')
    return query ? state.usersInGroup.filter(user => user.name.match(regex) || user.email.match(regex)) : state.usersInGroup
  }
}

const mutations = {
  [RECEIVE_GROUP](state, payload) {
    state.group = payload
  },

  [UPDATE_GROUP](state, payload) {
    state.group = payload
  },

  [ADD_GROUP_USER](state, user) {
    state.usersInGroup.push(user)
  },

  [DEACTIVATE_GROUP_USER](state, userId) {
    const index = state.usersInGroup.findIndex(user => user.id === userId)
    state.usersInGroup[index].activated = false
  },

  [ACTIVATE_GROUP_USER](state, userId) {
    const index = state.usersInGroup.findIndex(user => user.id === userId)
    state.usersInGroup[index].activated = true
  },

  [UPDATE_GROUP_USER](state, user) {
    const index = state.usersInGroup.findIndex(u => u.id === user.id)
    state.usersInGroup[index] = user
  },

  [REMOVE_GROUP_USER](state, payload) {
    state.usersInGroup = state.usersInGroup.filter(user => user.id !== payload)
  },

  [UPDATE_GROUP_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_GROUP_ERRORS](state) {
    state.errors = {}
  },

  [FETCH_USERS_IN_GROUP](state, payload) {
    state.usersInGroup = payload.users
  }
}

const actions = {
  getGroup({ commit, state }, id) {
    return callApi({
      method: 'get',
      url: `/groups/${id}`
    })
      .then(response => {
        commit(RECEIVE_GROUP, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  updateGroup({ commit }, params) {
    let formData = new FormData()
    Object.keys(params.editParams).forEach(key => formData.set(`group[${key}]`, params.editParams[key] || ''))

    return callApi({
      method: 'put',
      url: `/groups/${params.groupId}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        commit(UPDATE_GROUP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_GROUP_ERRORS, error.response.data)
        throw error
      })
  },

  addGroupUser({ commit }, params) {
    return callApi({
      method: 'post',
      url: `/groups/${params.groupId}/add_user`,
      data: { user_id: params.user.id },
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        commit(ADD_GROUP_USER, params.user)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deactivateGroupUser({ commit }, userId) {
    return callApi({
      method: 'post',
      url: `/users/${userId}/deactivate`,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        commit(DEACTIVATE_GROUP_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  activateGroupUser({ commit }, userId) {
    return callApi({
      method: 'post',
      url: `/users/${userId}/activate`,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        commit(ACTIVATE_GROUP_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  removeGroupUser({ commit }, params) {
    return callApi({
      method: 'delete',
      url: `/groups/${params.groupId}/remove_user?user_id=${params.userId}`
    })
      .then(response => {
        commit(REMOVE_GROUP_USER, params.userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteGroup({ commit }, groupId) {
    return callApi({
      method: 'delete',
      url: `/groups/${groupId}`
    })
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getUsersInGroup({ commit, state }, groupId) {
    return callApi({
      method: 'get',
      url: '/users',
      params: { group_id: groupId, type: 'users_in_group', per_page: 1000 }
    })
      .then(response => {
        commit(FETCH_USERS_IN_GROUP, response.data)
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
