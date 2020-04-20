// activities repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  activities: '/activities'
})

export default {
  getActivities(params) {
    return apiCaller({ method: 'get', url: resources.get('activities'), params })
  }
}
