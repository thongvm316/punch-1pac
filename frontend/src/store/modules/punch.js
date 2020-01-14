import { PUNCH_INIT_ATTENDANCE, PUNCH_IN, PUNCH_OUT } from '../mutation-types.js'
import callApi from '../api-caller'

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
    return callApi({
      method: 'post',
      url: '/attendances',
      data: { user_id: userId }
    })
      .then(response => {
        commit(PUNCH_IN, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  punchOut({ commit, state }, userId) {
    return callApi({
      method: 'patch',
      url: `/attendances/${state.attendance.id}`,
      data: { user_id: userId }
    })
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
