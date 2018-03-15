import * as types from '../mutation-types'
import axios from 'axios'
import moment from '../../moment'

const state = {
  attendances: []
}

const getters = {
  getFormattedAttendances (state) {
    let attendances = []
    let index = 0
    const date = state.attendances[0] ? moment(state.attendances[0].day) : moment()

    for (let day = 1; day <= date.daysInMonth(); day++) {
      const currentDay = moment(`${date.year()}-${date.format('MM')}-${day}`, 'YYYY-MM-D')
      let attendance = null
      if (moment().isBefore(currentDay)) {
        attendance = {
          id: null,
          day: currentDay.format('YYYY-MM-DD'),
          attended_at: '',
          left_at: '',
          attending_status: '',
          leaving_status: '',
          off_status: ''
        }
      } else if (state.attendances[index] && currentDay.format('YYYY-MM-DD') === state.attendances[index].day) {
        attendance = state.attendances[index]
        index++
      } else {
        attendance = {
          id: null,
          day: currentDay.format('YYYY-MM-DD'),
          attended_at: '',
          left_at: '',
          attending_status: '',
          leaving_status: '',
          off_status: 'unpaid_leave'
        }
      }
      attendances.push(attendance)
    }

    return attendances
  }
}

const mutations = {
  [types.FETCH_CALENDAR_ATTENDANCES] (state, payload) {
    state.attendances = payload
  }
}

const actions = {
  getCalendarAttendances ({ commit }, day) {
    return axios.get('/attendances/calendar', { params: { day: day } })
                .then(response => {
                  commit(types.FETCH_CALENDAR_ATTENDANCES, response.data)
                  return response
                })
                .catch(error => { throw error })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
