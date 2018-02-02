import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  sessions: []
}

const mutations = {
  [types.FETCH_SESSIONS] (state, payload) {
    state.sessions = payload
  },
  [types.DELETE_SESSION] (state, payload) {
    state.sessions = state.sessions.filter(session => session.id !== payload)
  }
}

const actions = {
  fetchSessions ({ commit }) {
    axios.get('/sessions')
         .then((response) => commit(types.FETCH_SESSIONS, response.data))
  },
  deleteSession ({ commit }, data) {
    axios.delete(`/sessions/${data}`)
         .then((response) => commit(types.DELETE_SESSION, data))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
