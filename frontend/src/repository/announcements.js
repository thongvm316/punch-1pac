// announcements repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  announcements: '/announcements'
})

export default {
  readAnnouncement(id) {
    return apiCaller({ method: 'post', url: `${resources.get('announcements')}/${id}/read` })
  },

  getHeaderAnnouncements(params) {
    return apiCaller({ method: 'get', url: resources.get('announcements'), params })
  }
}
