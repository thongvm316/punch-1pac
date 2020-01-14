import { UPDATE_REMIND_PUNCH_IN } from '../mutation-types.js'

const state = {
  open: true
}

const mutations = {
  [UPDATE_REMIND_PUNCH_IN](state, value) {
    state.open = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
