import 'formdata-polyfill'
import { RECEIVE_GROUPS, ADD_GROUP, UPDATE_GROUPS_ERRORS, CLEAR_GROUPS_ERRORS } from '../mutation-types.js'
import Repositories from '@/repository'

const groupsRepository = Repositories.get('groups')

const state = {
  errors: {},
  groups: []
}

const getters = {
  filterGroups: state => query => {
    const regex = new RegExp(`${query.trim()}`, 'gi')
    return query ? state.groups.filter(group => group.name.match(regex)) : state.groups
  }
}

const mutations = {
  [RECEIVE_GROUPS](state, payload) {
    state.groups = payload
  },

  [ADD_GROUP](state, payload) {
    state.groups.push(payload)
  },

  [UPDATE_GROUPS_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_GROUPS_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  getGroups({ commit }) {
    return groupsRepository.getGroups()
      .then(response => {
        commit(RECEIVE_GROUPS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  addGroup({ commit }, params) {
    let formData = new FormData()
    Object.keys(params).forEach(key => formData.set(`group[${key}]`, params[key] || ''))

    return groupsRepository.createGroup({
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        commit(ADD_GROUP, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_GROUPS_ERRORS, error.response.data)
        throw error
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
