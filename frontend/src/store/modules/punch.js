import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  id: null,
  attendedAt: null,
  leftAt: null
}

const mutations = {
  [types.PUNCH_IN] (state, payload) {
    state.id = payload.id
    state.attendedAt = payload.attended_at
  },

  [types.PUNCH_OUT] (state, payload) {
    state.leftAt = payload.left_at
  }
}

const actions = {
  punchIn ({ commit }) {
    axios.post('/attendances')
         .then((response) => commit(types.PUNCH_IN, response.data))
  },

  punchOut ({ commit, state }) {
    axios.patch(`/attendances/${state.id}`)
         .then((response) => commit(types.PUNCH_OUT, response.data))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
