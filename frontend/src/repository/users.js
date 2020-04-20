// users repository

import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  users: '/users',
  usersPassword: '/users/change_password',
  createMultiUsers: '/users/create_multi',
  groupPendingRequests: '/users/group_pending_requests',
  userSessions: '/sessions'
})

export default {
  getUsers(params) {
    return apiCaller({ method: 'get', url: resources.get('users'), params })
  },

  createUser(data) {
    return apiCaller({ method: 'post', url: resources.get('users'), data })
  },

  createMultiUsers({ data, headers }) {
    return apiCaller({ method: 'post', url: resources.get('createMultiUsers'), data, headers })
  },

  updatePassword(data) {
    return apiCaller({ method: 'put', url: resources.get('usersPassword'), data })
  },

  deactivateUser(id) {
    return apiCaller({ method: 'post', url: `${resources.get('users')}/${id}/deactivate` })
  },

  activateUser(id) {
    return apiCaller({ method: 'post', url: `${resources.get('users')}/${id}/activate` })
  },

  deleteUser(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('users')}/${id}` })
  },

  // group pending requests
  getGroupPendingRequests() {
    return apiCaller({ method: 'get', url: resources.get('groupPendingRequests') })
  },

  // initial states
  updateUser(id, { data, headers }) {
    return apiCaller({ method: 'put', url: `${resources.get('users')}/${id}`, data, headers })
  },

  // sessions
  getSessions() {
    return apiCaller({ method: 'get', url: resources.get('userSessions') })
  },

  deleteSession(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('userSessions')}/${id}` })
  }
}
