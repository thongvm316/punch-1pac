import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  group: {}
}

const mutations = {
  [types.RECEIVE_GROUP] (state, payload) {
    state.group = payload
  }
}

const actions = {
  getGroup ({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      axios.get(`/groups/${id}`)
           .then((response) => {
             commit(types.RECEIVE_GROUP, response.data)
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
