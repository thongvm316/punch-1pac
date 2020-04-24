import {
  INITIAL_STATES_SET_USER,
  INITIAL_STATES_UPDATE_USER,
  INITIAL_STATES_UPDATE_USER_LANGUAGE,
  INITIAL_STATES_SET_COMPANY,
  INITIAL_STATES_UPDATE_COMPANY,
  INITIAL_STATES_SET_USER_ERRORS,
  INITIAL_STATES_CLEAR_USER_ERRORS,
  INITIAL_STATES_SET_COMPANY_ERRORS,
  INITIAL_STATES_CLEAR_COMPANY_ERRORS,
  INITIAL_STATES_SET_META,
  INITIAL_STATES_UPDATE_PASSWORD_CHANGED
} from '../mutation-types.js'
import Repositories from '@/repository'
import 'formdata-polyfill'

const usersRepository = Repositories.get('users')
const companySettingsRepository = Repositories.get('companySettings')

const state = {
  userErrors: {},
  companyErrors: {},
  currentUser: {},
  currentCompany: {},
  meta: {}
}

const mutations = {
  [INITIAL_STATES_SET_USER](state, payload) {
    state.currentUser = payload
  },

  [INITIAL_STATES_UPDATE_USER](state, payload) {
    state.currentUser = payload
  },

  [INITIAL_STATES_UPDATE_USER_LANGUAGE](state, payload) {
    state.currentUser.language = payload
  },

  [INITIAL_STATES_SET_COMPANY](state, payload) {
    state.currentCompany = payload
  },

  [INITIAL_STATES_UPDATE_COMPANY](state, payload) {
    state.currentCompany = payload
  },

  [INITIAL_STATES_SET_USER_ERRORS](state, payload) {
    state.userErrors = payload.errors
  },

  [INITIAL_STATES_CLEAR_USER_ERRORS](state) {
    state.userErrors = {}
  },

  [INITIAL_STATES_SET_COMPANY_ERRORS](state, payload) {
    state.companyErrors = payload.errors
  },

  [INITIAL_STATES_CLEAR_COMPANY_ERRORS](state) {
    state.companyErrors = {}
  },

  [INITIAL_STATES_SET_META](state, payload) {
    state.meta = payload
  },

  [INITIAL_STATES_UPDATE_PASSWORD_CHANGED](state, value) {
    state.currentUser.password_changed = value
  }
}

const actions = {
  updateUser({ commit }, data) {
    let formData = new FormData()
    Object.keys(data.userParams).forEach(key => formData.set(`user[${key}]`, data.userParams[key] || ''))

    return usersRepository.updateUser(data.userId, { data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        commit(INITIAL_STATES_UPDATE_USER, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(INITIAL_STATES_SET_USER_ERRORS, error.response.data)
        throw error
      })
  },

  updateCompany({ commit }, companyParams) {
    let formData = new FormData()
    Object.keys(companyParams).forEach(key => {
      if (Array.isArray(companyParams[key])) {
        companyParams[key].forEach(v => formData.append(`company[${key}]`, v || ''))
      } else {
        formData.set(`company[${key}]`, companyParams[key])
      }
    })

    companySettingsRepository.updateCompany({ data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        commit(INITIAL_STATES_UPDATE_COMPANY, response.data)
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(INITIAL_STATES_SET_COMPANY_ERRORS, error.response.data)
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
