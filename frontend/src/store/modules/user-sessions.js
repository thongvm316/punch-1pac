import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  sessions: [],
  errors: {},
  currentSession: {}
}

const mutations = {
  [types.FETCH_SESSIONS](state, payload) {
    state.sessions = payload.sessions
    state.currentSession = payload.meta
  },

  [types.DELETE_SESSION](state, payload) {
    state.sessions = state.sessions.filter(session => session.id !== payload)
  }
}

const actions = {
  fetchSessions({ commit }) {
    return axios
      .get('/sessions')
      .then(response => {
        commit(types.FETCH_SESSIONS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteSession({ commit }, data) {
    return axios
      .delete(`/sessions/${data}`)
      .then(response => {
        commit(types.DELETE_SESSION, data)
        return response
      })
      .catch(error => {
        throw error
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
