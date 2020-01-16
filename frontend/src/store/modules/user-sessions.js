import { FETCH_SESSIONS, DELETE_SESSION } from '../mutation-types'
import callApi from '../api-caller'

const state = {
  sessions: [],
  errors: {},
  currentSession: {}
}

const mutations = {
  [FETCH_SESSIONS](state, payload) {
    state.sessions = payload.sessions
    state.currentSession = payload.meta
  },

  [DELETE_SESSION](state, payload) {
    state.sessions = state.sessions.filter(session => session.id !== payload)
  }
}

const actions = {
  fetchSessions({ commit }) {
    return callApi({
      method: 'get',
      url: '/sessions'
    })
      .then(response => {
        commit(FETCH_SESSIONS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteSession({ commit }, data) {
    return callApi({
      method: 'delete',
      url: `/sessions/${data}`
    })
      .then(response => {
        commit(DELETE_SESSION, data)
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
