import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  pendingRequests: []
}

const mutations = {
  [types.RECEVIE_GROUP_PENDING_REQUESTS] (state, payload) {
    state.pendingRequests = payload
  }
}

const actions = {
  getGroupPendingRequests ({ commit, state }) {
    return axios.get('/users/group_pending_requests')
                .then(response => {
                  commit(types.RECEVIE_GROUP_PENDING_REQUESTS, response.data)
                  return response
                })
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
