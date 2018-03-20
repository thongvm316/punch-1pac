import * as types from '../mutation-types.js'

const state = {
  message: null
}

const mutations = {
  [types.SET_FLASH_MESSAGE] (state, message) {
    state.message = message
  }
}

const actions = {
  setFlashMsg ({ commit }, message) {
    commit(types.SET_FLASH_MESSAGE, message)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
