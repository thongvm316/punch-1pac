import { FETCH_STATUS_CARDS } from '../mutation-types.js'
import Repositories from '@/repository'

const attendancesRepository = Repositories.get('attendances')

const state = {
  statuses: {},
  meta: {}
}

const mutations = {
  [FETCH_STATUS_CARDS](state, payload) {
    state.statuses = payload.statuses
    state.meta = payload.meta
  }
}

const actions = {
  getStatuses({ commit }, month) {
    const params = { date: month }

    return attendancesRepository.getStatuses(params)
      .then(response => {
        commit(FETCH_STATUS_CARDS, response.data)
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
