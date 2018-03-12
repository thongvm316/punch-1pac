import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  users: []
}

const getters = {
  filterByEmail (state) {
    return function (query) {
      const regex = new RegExp(`${query}`, 'g')
      return query ? state.users.filter(user => user.email.match(regex)) : state.users
    }
  }
}

const mutations = {
  [types.DELETE_USER] (state, id) {
    state.users = state.users.filter(user => user.id !== id)
  },

  [types.FETCH_USERS] (state, payload) {
    state.users = payload.users
  }
}

const actions = {
  fetchUsers ({ commit }) {
    return axios.get('/users', { params: { per_page: 1000 } })
                .then(response => {
                  commit(types.FETCH_USERS, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  deleteUser ({ commit }, id) {
    return axios.delete(`/users/${id}`)
                .then(response => {
                  commit(types.DELETE_USER, id)
                  return response
                })
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
