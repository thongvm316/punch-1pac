import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
  group: {}
}

const mutations = {
  [types.RECEIVE_GROUP] (state, payload) {
    state.group = payload
  },

  [types.UPDATE_GROUP] (state, payload) {
    state.group.name = payload.name
  },

  [types.UPDATE_GROUP_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_GROUP_ERRORS] (state) {
    state.errors = {}
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
  },

  updateGroup ({ commit }, params) {
    axios.put(`/groups/${params.groupId}`, { group: params.editParams }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.UPDATE_GROUP, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_GROUP_ERRORS, error.response.data)
         })
  },

  clearGroupErrors ({ commit }) {
    commit(types.CLEAR_GROUP_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
