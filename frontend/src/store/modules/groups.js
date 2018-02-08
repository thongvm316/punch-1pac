import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  groups: []
}

const mutations = {
  [types.RECEIVE_GROUPS] (state, payload) {
    state.groups = payload
  }
}

const actions = {
  getGroups ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get('/groups')
           .then((response) => {
             commit(types.RECEIVE_GROUPS, response.data)
             resolve(response)
           })
           .catch((error) => reject(error))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
