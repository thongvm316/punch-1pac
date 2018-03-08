import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  userErrors: {},
  companyErrors: {},
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

  [types.INITIAL_STATES_SET_USER_ERRORS] (state, payload) {
    state.userErrors = payload.errors
  },

  [types.INITIAL_STATES_CLEAR_USER_ERRORS] (state, payload) {
    state.userErrors = {}
  },

  [types.INITIAL_STATES_UPDATE_COMPANY] (state, payload) {
    state.currentCompany = payload
  },

  [types.INITIAL_STATES_SET_COMPANY_ERRORS] (state, payload) {
    state.companyErrors = payload.errors
  },

  [types.INITIAL_STATES_CLEAR_COMPANY_ERRORS] (state, payload) {
    state.companyErrors = {}
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
    Object.keys(data.userParams).forEach(key => formData.set(`user[${key}]`, data.userParams[key] || ''))

    axios.put(`/users/${data.userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => {
            commit(types.INITIAL_STATES_UPDATE_USER, response.data)
          })
          .catch(error => {
            if (error.response && error.response.status === 422) commit(types.INITIAL_STATES_SET_USER_ERRORS, error.response.data)
          })
  },

  updateCompany ({ commit }, companyParams) {
    let formData = new FormData()
    Object.keys(companyParams).forEach(key => {
      if (Array.isArray(companyParams[key])) {
        companyParams[key].forEach(v => formData.append(`company[${key}]`, v || ''))
      } else {
        formData.set(`company[${key}]`, companyParams[key])
      }
    })

    axios.put('/company', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => {
            commit(types.INITIAL_STATES_UPDATE_COMPANY, response.data)
          })
          .catch(error => {
            if (error.response && error.response.status === 422) commit(types.INITIAL_STATES_SET_COMPANY_ERRORS, error.response.data)
          })
  },

  clearUserErrors ({ commit }) {
    commit(types.INITIAL_STATES_CLEAR_USER_ERRORS)
  },

  clearCompanyErrors ({ commit }) {
    commit(types.INITIAL_STATES_CLEAR_COMPANY_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}