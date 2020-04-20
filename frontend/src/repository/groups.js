// groups repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  groups: '/groups'
})

export default {
  getGroups() {
    return apiCaller({ method: 'get', url: resources.get('groups') })
  },

  getGroup(id) {
    return apiCaller({ method: 'get', url: `${resources.get('groups')}/${id}` })
  },

  createGroup({ header, data }) {
    return apiCaller({ method: 'post', url: resources.get('groups'), data, header })
  },

  updateGroup(id, { header, data }) {
    return apiCaller({ method: 'put', url: `${resources.get('groups')}/${id}`, data, header })
  },

  deleteGroup(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('groups')}/${id}` })
  },

  addGroupUser(id, { data }) {
    return apiCaller({ method: 'post', url: `${resources.get('groups')}/${id}/add_user`, data })
  },

  removeGroupUser(params) {
    return apiCaller({ method: 'delete', url: `${resources.get('groups')}/${params.groupId}/remove_user?user_id=${params.userId}` })
  },

  // groups report
  getGroupReport(params) {
    return apiCaller({ method: 'get', url: `${resources.get('groups')}/${params.group_id}/report`, params })
  },

  getPersonalReport(params) {
    return apiCaller({ method: 'get', url: `${resources.get('groups')}/${params.group_id}/users/${params.user_id}/report`, params })
  }
}
