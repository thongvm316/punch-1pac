import * as types from '../mutation-types.js'
import axios from axios

const state = {
  user: {}
}

const mutations = {
  [types.UPDATE_USER] (state, payload) {
    state.user = payload
  }
}

const actions = {
  updateUser ({ commit }, params) {
    axios.put(`/users/${params.userId}`, { params: params.user })
         .then(response => commit(types.UPDATE_USER, response.data))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
