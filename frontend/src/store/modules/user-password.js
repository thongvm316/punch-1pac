import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {}
}

const mutations = {
  [types.UPDATE_USER_PASSWORD_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_USER_PASSWORD_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  updatePassword ({ commit }, params) {
    axios.put('/users/change_password', params)
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_USER_PASSWORD_ERRORS, error.response.data)
         })
  },

  clearUserPasswordErrors ({ commit }) {
    commit(types.CLEAR_USER_PASSWORD_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
