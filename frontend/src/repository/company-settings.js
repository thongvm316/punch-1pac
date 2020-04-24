// companySettings repository
import { Map } from 'immutable'
import apiCaller from './config/api-caller'

const resources = Map({
  company: '/company',
  allowedIps: '/allowed_ips',
  businessdays: '/business_days',
  holidays: '/holidays'
})

export default {
  // allowedIPs
  getIPs() {
    return apiCaller({ method: 'get', url: resources.get('allowedIps') })
  },

  createIP(data) {
    return apiCaller({ method: 'post', url: resources.get('allowedIps'), data })
  },

  updateIP(id, data) {
    return apiCaller({ method: 'put', url: `${resources.get('allowedIps')}/${id}`, data })
  },

  deleteIP(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('allowedIps')}/${id}` })
  },

  // businessDays
  getBusinessDays() {
    return apiCaller({ method: 'get', url: resources.get('businessdays') })
  },

  addBusinessDay(data) {
    return apiCaller({ method: 'post', url: resources.get('businessdays'), data })
  },

  deleteBusinessDay(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('businessdays')}/${id}` })
  },

  updateBusinessDay(id, data) {
    return apiCaller({ method: 'put', url: `${resources.get('businessdays')}/${id}`, data })
  },

  // holidays
  getHolidays(params) {
    return apiCaller({ method: 'get', url: resources.get('holidays'), params })
  },

  createHoliday(data) {
    return apiCaller({ method: 'post', url: resources.get('holidays'), data })
  },

  updateHoliday(id, data) {
    return apiCaller({ method: 'put', url: `${resources.get('holidays')}/${id}`, data })
  },

  deleteHoliday(id) {
    return apiCaller({ method: 'delete', url: `${resources.get('holidays')}/${id}` })
  },

  importNationalHolidays(data) {
    return apiCaller({ method: 'post', url: `${resources.get('holidays')}/import`, data })
  },

  // initial state
  updateCompany({ headers, data }) {
    return apiCaller({ method: 'put', url: resources.get('company'), data, headers })
  }
}
