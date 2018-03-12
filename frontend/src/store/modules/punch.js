import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  attendance: {}
}

const mutations = {
  [types.PUNCH_INIT_ATTENDANCE] (state, attendance) {
    state.attendance = attendance
  },

  [types.PUNCH_IN] (state, attendance) {
    state.attendance = attendance
  },

  [types.PUNCH_OUT] (state, attendance) {
    state.attendance = attendance
  }
}

const actions = {
  punchIn ({ commit }) {
    return axios.post('/attendances')
                .then(response => {
                  commit(types.PUNCH_IN, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  punchOut ({ commit, state }) {
    return axios.patch(`/attendances/${state.attendance.id}`)
                .then(response => {
                  commit(types.PUNCH_OUT, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  initAttendance ({ commit }, attendance) {
    commit(types.PUNCH_INIT_ATTENDANCE, attendance)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
