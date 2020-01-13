import * as types from '../mutation-types.js'

const state = {
  message: null,
  type: 'success',
  timeout: 3000
}

const mutations = {
  [types.SET_FLASH_MESSAGE](state, flash) {
    state.message = flash.message
    state.type = flash.type || 'success'
    state.timeout = flash.timeout || 3000
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
