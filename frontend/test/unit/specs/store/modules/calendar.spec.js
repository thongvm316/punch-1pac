import calendar from '@/store/modules/calendar'
import Repository from '@/repository'
import attendancesData from '../../../supports/fixtures/attendances.api'
import holidaysData from '../../../supports/fixtures/holidays.api'
jest.mock('@/repository/attendances')

const attendancesRepository = Repository.get('attendances')
const { state, mutations, actions } = calendar
const commit = jest.fn()

describe('mutations', () => {
  it('FETCH_CALENDAR_ATTENDANCES', () => {
    const payload = {
      attendances: [...attendancesData.attendances],
      holidays: [...holidaysData.holidays]
    }

    mutations.FETCH_CALENDAR_ATTENDANCES(state, payload)

    expect(state.attendances).toEqual(payload.attendances)
    expect(state.holidays).toEqual(payload.holidays)
  })
})

describe('actions', () => {
  it('getCalendarAttendances', async () => {
    const response = {
      data: {
        attendances: [...attendancesData.attendances],
        holidays: [...holidaysData.holidays]
      }
    }
    attendancesRepository.getCalendarAttendances.mockResolvedValue(response)

    await actions.getCalendarAttendances({ commit }, '2018-01-24')

    expect(commit).toHaveBeenCalledWith('FETCH_CALENDAR_ATTENDANCES', response.data)
  })
})
