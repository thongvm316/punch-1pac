import calendar from '@/store/modules/calendar'
import callApi from '@/store/api-caller'
import { calendarData } from '../api-data/calendar.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = calendar

describe('mutations', () => {
  it('FETCH_CALENDAR_ATTENDANCES', () => {
    const payload = calendarData()

    mutations.FETCH_CALENDAR_ATTENDANCES(state, payload)

    expect(state.attendances).toEqual(payload.attendances)
    expect(state.holidays).toEqual(payload.holidays)
  })
})

describe('actions', () => {
  it('getCalendarAttendances', async () => {
    const commit = jest.fn()
    const response = { data: calendarData() }
    callApi.mockResolvedValue(response)

    await actions.getCalendarAttendances({ commit }, '2018-01-24')

    expect(commit).toHaveBeenCalledWith('FETCH_CALENDAR_ATTENDANCES', response.data)
  })
})
