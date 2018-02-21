import * as types from '../mutation-types.js'
import axios from 'axios'

const states = {
  currentUser: {},
  currentCompany: {}
}

const mutations = {
  [types.INITIAL_STATES_SET_USER] (state, payload) {
    state.currentUser = payload
  },

  [types.INITIAL_STATES_SET_COMPANY] (state, payload) {
    state.currentCompany = payload
  },

  [types.INITIAL_STATES_UPDATE_USER] (state, payload) {
    state.currentUser = payload
  },

  [types.INITIAL_STATES_UPDATE_COMPANY] (state, payload) {
    state.currentCompany = payload
  }
}

const actions = {
  setCurrentUser ({ commit }, initialStates) {
    commit(types.INITIAL_STATES_SET_USER, initialStates.user)
  },

  setCurrentCompany ({ commit }, initialStates) {
    commit(types.INITIAL_STATES_SET_COMPANY, initialStates.company)
  },

  updateUser ({ commit }, data) {
    let formData = new FormData()
    Object.keys(data.userParams).forEach(key => {
      if (data.userParams[key]) formData.set(`user[${key}]`, data.userParams[key])
    })
    return new Promise((resolve, reject) => {
      axios.put(`/users/${data.userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
           .then(response => {
             commit(types.INITIAL_STATES_UPDATE_USER, response.data)
             resolve(response.data)
           })
    })
  },

  updateCompany ({ commit }, companyParams) {
    let formData = new FormData()
    Object.keys(companyParams).forEach(key => {
      if (companyParams[key]) formData.set(`company[${key}]`, companyParams[key])
    })
    return new Promise((resolve, reject) => {
      axios.put('/company', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
           .then(response => {
             commit(types.INITIAL_STATES_UPDATE_COMPANY, response.data)
             resolve(response.data)
           })
    })
  }
}

export default {
  namespaced: true,
  states,
  mutations,
  actions
}
