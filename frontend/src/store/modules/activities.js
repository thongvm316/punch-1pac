import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  activities: []
}

const mutations = {
  [types.FETCH_ACTIVITIES] (state, payload) {
    state.activities = payload.activities
  }
}

const actions = {
  getActivities ({ commit }) {
    return axios.get('/activities')
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
