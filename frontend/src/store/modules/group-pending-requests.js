import { RECEVIE_GROUP_PENDING_REQUESTS } from '../mutation-types.js'
import Repositories from '@/repository'

const usersRepository = Repositories.get('users')

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
    return usersRepository.getGroupPendingRequests()
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
