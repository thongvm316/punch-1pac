import { PUNCH_INIT_ATTENDANCE, PUNCH_IN, PUNCH_OUT } from '../mutation-types.js'
import Repositories from '@/repository'

const attendancesRepository = Repositories.get('attendances')

const state = {
  attendance: {},
  isInited: false
}

const mutations = {
  [PUNCH_INIT_ATTENDANCE](state, attendance) {
    state.attendance = attendance
    state.isInited = true
  },

  [PUNCH_IN](state, attendance) {
    state.attendance = attendance
  },

  [PUNCH_OUT](state, attendance) {
    state.attendance = attendance
  }
}

const actions = {
  punchIn({ commit }, userId) {
    const data = { user_id: userId }

    return attendancesRepository.punchIn(data)
      .then(response => {
        commit(PUNCH_IN, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  punchOut({ commit, state }, userId) {
    const data = { user_id: userId }

    return attendancesRepository.punchOut(state.attendance.id, data)
      .then(response => {
        commit(PUNCH_OUT, response.data)
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
