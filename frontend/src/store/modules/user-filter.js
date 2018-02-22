import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  filteredUsers: [],
  selectedUser: {}
}

const mutations = {
  [types.FILTERED_USERS] (state, payload) {
    state.filteredUsers = payload.users
  },
  [types.SELECTED_USER] (state, payload) {
    state.selectedUser = payload
  }
}

const actions = {
  filterUsersByEmail ({ commit }, userEmail) {
    return new Promise((resolve, reject) => {
      axios.get(`/users?email=${userEmail}`, { timeout: 5000 })
           .then((response) => {
             commit(types.FILTERED_USERS, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  },
  selectUser ({ commit }, user) {
    commit(types.SELECTED_USER, user)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
