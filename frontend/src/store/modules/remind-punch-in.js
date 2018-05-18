import * as types from '../mutation-types.js'

const state = {
  open: true
}

const mutations = {
  [types.UPDATE_REMIND_PUNCH_IN] (state, value) {
    state.open = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
