import { UPDATE_USER_PASSWORD_ERRORS, CLEAR_USER_PASSWORD_ERRORS } from '../mutation-types'
import callApi from '../api-caller'

const state = {
  errors: {}
}

const mutations = {
  [UPDATE_USER_PASSWORD_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_USER_PASSWORD_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  updatePassword({ commit }, params) {
    return callApi({
      method: 'put',
      url: '/users/change_password',
      data: params
    })
      .then(response => response)
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_USER_PASSWORD_ERRORS, error.response.data)
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
