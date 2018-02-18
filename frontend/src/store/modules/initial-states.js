import * as types from '../mutation-types.js'

const states = {
  currentUser: {},
  currentCompany: {}
}

const mutations = {
  [types.INITIAL_STATES_SET_USER] (state, payload) {
    state.currentUser = payload
  },

  [types.INITIAL_STATES_SET_COMPANY] (state, payload) {
    state.currentCompany = payload
  }
}

const actions = {
  setCurrentUser ({ commit }, initialStates) {
    commit(types.INITIAL_STATES_SET_USER, initialStates.user)
  },

  setCurrentCompany ({ commit }, initialStates) {
    commit(types.INITIAL_STATES_SET_COMPANY, initialStates.company)
  }
}

export default {
  namespaced: true,
  states,
  mutations,
  actions
}
