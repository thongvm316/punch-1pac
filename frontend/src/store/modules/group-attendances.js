import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  params: {},
  pager: {},
  attendances: [],
  usersInGroup: []
}

const mutations = {
  [types.RECEIVE_GROUP_ATTENDANCES] (state, payload) {
    state.pager = payload.meta
    state.attendances = payload.attendances
  },

  [types.FETCH_USERS_IN_GROUP_ATTENDANCES] (state, payload) {
    state.usersInGroup = payload.users
  }
}

const actions = {
  getAttendances ({ commit, state }, params = {}) {
    return axios.get('/attendances', { params: Object.assign(state.params, params) })
                .then(response => {
                  commit(types.RECEIVE_GROUP_ATTENDANCES, response.data)
                  return response
                })
                .catch(error => { throw error })
  },

  getUsersInGroup ({ commit, state }, groupId) {
    return axios.get('/users', { params: { group_id: groupId, type: 'users_in_group', per_page: 1000 } })
                .then(response => {
                  commit(types.FETCH_USERS_IN_GROUP_ATTENDANCES, response.data)
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
