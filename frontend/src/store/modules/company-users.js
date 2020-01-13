import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  users: []
}

const getters = {
  filterByEmail: state => query => {
    const regex = new RegExp(`${query.trim()}`, 'gi')
    return query ? state.users.filter(user => (user.name.match(regex)) || (user.email.match(regex))) : state.users
  }
}

const mutations = {
  [types.DELETE_USER](state, id) {
    state.users = state.users.filter(user => user.id !== id)
  },

  [types.FETCH_USERS](state, payload) {
    state.users = payload.users
  },

  [types.UPDATE_USER](state, payload) {
    const index = state.users.findIndex(user => user.id === payload.id)
    state.users[index] = payload
  },

  [types.DEACTIVATE_USER](state, userId) {
    const index = state.users.findIndex(user => user.id === userId)
    state.users[index].activated = false
  },

  [types.ACTIVATE_USER](state, userId) {
    const index = state.users.findIndex(user => user.id === userId)
    state.users[index].activated = true
  }
}

const actions = {
  fetchUsers({ commit }, params) {
    return callApi({ method: 'get', url: '/users', params: Object.assign({ per_page: 1000 }, params) })
      .then(response => {
        commit(types.FETCH_USERS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteUser({ commit }, id) {
    return callApi({ method: 'delete', url: `/users/${id}` })
      .then(response => {
        commit(types.DELETE_USER, id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deactivateUser({ commit }, userId) {
    return callApi({ method: 'post', url: `/users/${userId}/deactivate` })
      .then(response => {
        commit(types.DEACTIVATE_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  activateUser({ commit }, userId) {
    return callApi({ method: 'post', url: `/users/${userId}/activate` })
      .then(response => {
        commit(types.ACTIVATE_USER, userId)
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
