import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  users: []
}

const mutations = {
  [types.FETCH_USERS] (state, payload) {
    state.users = payload.users
  }
}

const actions = {
  fetchUsers ({ commit }) {
    axios.get('/users', { params: { per_page: 1000 } })
         .then((response) => commit(types.FETCH_USERS, response.data))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
