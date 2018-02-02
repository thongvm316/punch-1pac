import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  sessions: []
}

const mutations = {
  [types.FETCH_SESSIONS] (state, payload) {
    state.sessions = payload
  },
  [types.DELETE_SESSIONS] (state, payload) {
    const record = state.sessions.find(element => element.id === payload)
    state.sessions.splice(state.sessions.indexOf(record), 1)
  }
}

const actions = {
  fetchSessions ({ commit }) {
    axios.get('/sessions')
         .then((response) => commit(types.FETCH_SESSIONS, response.data))
  },
  deleteSessions ({ commit }, data) {
    axios.delete(`/sessions/${data.id}`)
         .then((response) => commit(types.DELETE_SESSIONS, data.id))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
