import { FETCH_SESSIONS, DELETE_SESSION } from '../mutation-types'
import Repositories from '@/repository'

const usersRepository = Repositories.get('users')

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
    return usersRepository.getSessions()
      .then(response => {
        commit(FETCH_SESSIONS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteSession({ commit }, id) {
    return usersRepository.deleteSession(id)
      .then(response => {
        commit(DELETE_SESSION, id)
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
