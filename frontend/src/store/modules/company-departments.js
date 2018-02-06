import * as types from '../mutation-types.js'
import axios from 'axios'

const state = {
  errors: {},
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

  [types.UPDATE_DEPARTMENT] (state, payload) {
    const index = state.departments.findIndex(department => department.id === payload.id)
    state.departments[index] = payload
  },

  [types.UPDATE_DEPARTMENT_ERRORS] (state, payload) {
    state.errors = payload.errors
  },

  [types.CLEAR_DEPARTMENT_ERRORS] (state) {
    state.errors = {}
  }
}

const actions = {
  fetchDepartments ({ commit }) {
    axios.get('/departments')
         .then((response) => commit(types.FETCH_DEPARTMENTS, response.data))
  },

  addDepartment ({ commit }, params = {}) {
    axios.post('/departments', { department: params }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.ADD_DEPARTMENT, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_DEPARTMENT_ERRORS, error.response.data)
         })
  },

  deleteDepartment ({ commit }, departmentId) {
    axios.delete(`/departments/${departmentId}`)
         .then(() => commit(types.DELETE_DEPARTMENT, departmentId))
  },

  updateDepartment ({ commit }, deparment) {
    axios.put(`departments/${deparment.departmentId}`, { department: deparment.editParams }, { headers: { 'Content-Type': 'application/json' } })
         .then((response) => commit(types.UPDATE_DEPARTMENT, response.data))
         .catch((error) => {
           if (error.response && error.response.status === 422) commit(types.UPDATE_DEPARTMENT_ERRORS, error.response.data)
         })
  },

  clearDepartmentErrors ({ commit }) {
    commit(types.CLEAR_DEPARTMENT_ERRORS)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
