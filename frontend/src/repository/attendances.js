// attendance repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  attendances: '/attendances',
  calendar: '/attendances/calendar',
  chart: '/attendances/chart'
})

export default {
  getAttendances(params) {
    return apiCaller({ method: 'get', url: resources.get('attendances'), params })
  },

  getCalendarAttendances(params) {
    return apiCaller({ method: 'get', url: resources.get('calendar'), params })
  },

  // punch in/out
  punchIn(data) {
    return apiCaller({ method: 'post', url: resources.get('attendances'), data })
  },

  punchOut(id, data) {
    return apiCaller({ method: 'patch', url: `${resources.get('attendances')}/${id}`, data })
  },

  // status
  getStatuses(params) {
    return apiCaller({ method: 'get', url: resources.get('chart'), params })
  }
}
