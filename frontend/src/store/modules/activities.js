import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  activities: [],
  pager: {}
}

const mutations = {
  [types.FETCH_ACTIVITIES] (state, payload) {
    payload.activities.forEach(activity => state.activities.push(activity))
    state.pager = payload.meta
  }
}

const actions = {
  getActivities ({ commit }, params = {}) {
    return axios.get('/activities', { params: Object.assign({ per_page: 10 }, params) })
                .then(response => commit(types.FETCH_ACTIVITIES, response.data))
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
