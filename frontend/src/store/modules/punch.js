import * as types from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  attendance: {},
  isInited: false
}

const mutations = {
  [types.PUNCH_INIT_ATTENDANCE](state, attendance) {
    state.attendance = attendance
    state.isInited = true
  },

  [types.PUNCH_IN](state, attendance) {
    state.attendance = attendance
  },

  [types.PUNCH_OUT](state, attendance) {
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
        commit(types.PUNCH_IN, response.data)
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
        commit(types.PUNCH_OUT, response.data)
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
