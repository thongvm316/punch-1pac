// requests repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  requests: '/requests'
})

export default {
  getRequests(params) {
    return apiCaller({ method: 'get', url: resources.get('requests'), params })
  },

  addRequest(data) {
    return apiCaller({ method: 'post', url: resources.get('requests'), data })
  },

  updateRequest(id, data) {
    return apiCaller({ method: 'patch', url: `${resources.get('requests')}/${id}`, data })
  },

  deleteRequest(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('requests')}/${id}` })
  },

  approveRequest(id) {
    return apiCaller({ method: 'post', url: `${resources.get('requests')}/${id}/approve` })
  },

  rejectRequest(id, { data }) {
    return apiCaller({ method: 'post', url: `${resources.get('requests')}/${id}/reject`, data })
  }
}
