import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  departments: []
}

const mutations = {
  [types.FETCH_DEPARTMENTS] (state, payload) {
    state.departments = payload
  },

  [types.ADD_DEPARTMENT] (state, payload) {
    state.departments.push(payload)
  },

  [types.DELETE_DEPARTMENT] (state, departmentId) {
    state.departments = state.departments.filter(department => department.id !== departmentId)
  },

  [types.EDIT_DEPARTMENT] (state, payload) {
    const index = state.departments.findIndex(department => department.id === payload.id)
    state.departments[index] = payload
  }
}

const actions = {
  fetchDepartments ({ commit }) {
    axios.get('/departments')
         .then((response) => commit(types.FETCH_DEPARTMENTS, response.data))
  },

  addDepartment ({ commit }, data) {
    axios.post('/departments', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.ADD_DEPARTMENT, response.data))
  },

  deleteDepartment ({ commit }, departmentId) {
    axios.delete(`/departments/${departmentId}`)
         .then(() => commit(types.DELETE_DEPARTMENT, departmentId))
  },

  editDepartment ({ commit }, data) {
    axios.put(`departments/${data.departmentId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
         .then((response) => commit(types.EDIT_DEPARTMENT, response.data))
  }
}

const getters = {
  fetchDepartment (state) {
    return function (departmentId) {
      return state.departments.find(department => department.id === departmentId)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}