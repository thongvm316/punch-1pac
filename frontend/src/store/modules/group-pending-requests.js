import { RECEVIE_GROUP_PENDING_REQUESTS } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  pendingRequests: []
}

const mutations = {
  [RECEVIE_GROUP_PENDING_REQUESTS](state, payload) {
    state.pendingRequests = payload
  }
}

const actions = {
  getGroupPendingRequests({ commit }) {
    return callApi({ method: 'get', url: '/users/group_pending_requests' })
      .then(response => {
        commit(RECEVIE_GROUP_PENDING_REQUESTS, response.data)
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
