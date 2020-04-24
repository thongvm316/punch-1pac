import 'formdata-polyfill'
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
import Repositories from '@/repository'

const groupsRepository = Repositories.get('groups')
const usersRepository = Repositories.get('users')

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
  getGroup({ commit }, id) {
    return groupsRepository.getGroup(id)
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

    return groupsRepository.updateGroup(params.groupId, { data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        commit(UPDATE_GROUP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_GROUP_ERRORS, error.response.data)
        throw error
      })
  },

  deleteGroup({ commit }, groupId) {
    return groupsRepository.deleteGroup(groupId)
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  },

  getUsersInGroup({ commit }, groupId) {
    const params = { group_id: groupId, type: 'users_in_group', per_page: 1000 }

    return usersRepository.getUsers(params)
      .then(response => {
        commit(FETCH_USERS_IN_GROUP, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  addGroupUser({ commit }, params) {
    return groupsRepository.addGroupUser(params.groupId, { data: { user_id: params.user.id } })
      .then(response => {
        commit(ADD_GROUP_USER, params.user)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  removeGroupUser({ commit }, params) {
    return groupsRepository.removeGroupUser(params)
      .then(response => {
        commit(REMOVE_GROUP_USER, params.userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deactivateGroupUser({ commit }, userId) {
    return usersRepository.deactivateUser(userId)
      .then(response => {
        commit(DEACTIVATE_GROUP_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  activateGroupUser({ commit }, userId) {
    return usersRepository.activateUser(userId)
      .then(response => {
        commit(ACTIVATE_GROUP_USER, userId)
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
