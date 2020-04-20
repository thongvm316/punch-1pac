// notifications repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  notifications: '/notifications'
})

export default {
  getNotifications(params) {
    return apiCaller({ method: 'get', url: resources.get('notifications'), params })
  },

  readNotification(id) {
    return apiCaller({ method: 'post', url: `${resources.get('notifications')}/${id}/read` })
  }
}
