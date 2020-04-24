import {
  CREATE_USER,
  CREATE_MULTI_USER,
  DELETE_USER, FETCH_USERS,
  UPDATE_USER,
  DEACTIVATE_USER,
  ACTIVATE_USER,
  UPDATE_USER_ERRORS,
  CLEAR_USER_ERRORS
} from '../mutation-types.js'
import Repositories from '@/repository'

const usersRepository = Repositories.get('users')

const state = {
  users: [],
  errors: {}
}

const getters = {
  filterByEmail: state => query => {
    const regex = new RegExp(`${query.trim()}`, 'gi')
    return query ? state.users.filter(user => user.name.match(regex) || user.email.match(regex)) : state.users
  }
}

const mutations = {
  [DELETE_USER](state, id) {
    state.users = state.users.filter(user => user.id !== id)
  },

  [CREATE_USER](state, payload) {
    state.users.push(payload)
  },

  [CREATE_MULTI_USER](state, payload) {
    state.users = state.users.concat(payload.users)
  },

  [FETCH_USERS](state, payload) {
    state.users = payload.users
  },

  [UPDATE_USER](state, payload) {
    const index = state.users.findIndex(user => user.id === payload.id)
    state.users[index] = payload
  },

  [DEACTIVATE_USER](state, userId) {
    const index = state.users.findIndex(user => user.id === userId)
    state.users[index].activated = false
  },

  [ACTIVATE_USER](state, userId) {
    const index = state.users.findIndex(user => user.id === userId)
    state.users[index].activated = true
  },

  [UPDATE_USER_ERRORS](state, payload) {
    state.errors = payload.errors
  },

  [CLEAR_USER_ERRORS](state) {
    state.errors = {}
  }
}

const actions = {
  createUser({ commit }, data) {
    const dataRequest = { user: data }

    return usersRepository.createUser(dataRequest)
      .then(response => {
        commit(CREATE_USER, response.data)
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 422) commit(UPDATE_USER_ERRORS, error.response.data)
        throw error
      })
  },

  createMultiUser({ commit }, data) {
    let formData = new FormData()
    formData.append('csv_file', data.csv_file)

    return usersRepository.createMultiUsers({ data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        commit(CREATE_MULTI_USER, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  fetchUsers({ commit }, params) {
    const paramsRequest = Object.assign({ per_page: 1000 }, params)

    return usersRepository.getUsers(paramsRequest)
      .then(response => {
        commit(FETCH_USERS, response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deleteUser({ commit }, id) {
    return usersRepository.deleteUser(id)
      .then(response => {
        commit(DELETE_USER, id)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  deactivateUser({ commit }, userId) {
    return usersRepository.deactivateUser(userId)
      .then(response => {
        commit(DEACTIVATE_USER, userId)
        return response
      })
      .catch(error => {
        throw error
      })
  },

  activateUser({ commit }, userId) {
    return usersRepository.activateUser(userId)
      .then(response => {
        commit(ACTIVATE_USER, userId)
        return response
      })
      .catch(error => {
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
