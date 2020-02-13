import { FETCH_ACTIVITIES, FETCH_MORE_ACTIVITIES } from '../mutation-types.js'
import callApi from '../api-caller'

const state = {
  activities: [],
  pager: {}
}

const mutations = {
  FETCH_ACTIVITIES(state, payload) {
    state.activities = payload.activities
    state.pager = payload.meta
  },

  FETCH_MORE_ACTIVITIES(state, payload) {
    state.activities = state.activities.concat(payload.activities)
    state.pager = payload.meta
  }
}

const actions = {
  getActivities({ commit }, params = {}) {
    return callApi({ method: 'get', url: '/activities', params: Object.assign({ per_page: 10 }, params) })
      .then(response => commit(FETCH_ACTIVITIES, response.data))
      .catch(error => {
        throw error
      })
  },

  getMoreActivities({ commit }, params = {}) {
    return callApi({ method: 'get', url: '/activities', params: Object.assign({ per_page: 10 }, params) })
      .then(response => commit(FETCH_MORE_ACTIVITIES, response.data))
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
