import companyHolidays from '@/store/modules/company-holidays'
import callApi from '@/store/api-caller'
import { holidaysData } from '../api-data/holidays.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions, getters } = companyHolidays
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when holidays', () => {
    it('should FETCH_HOLIDAYS', () => {
      payload = holidaysData()
      mutations.FETCH_HOLIDAYS(state, payload)

      expect(state.holidays).toEqual(payload)
    })

    describe('when handle CUD methods', () => {
      beforeEach(() => {
        state.holidays = holidaysData()
      })

      it('should DELETE_HOLIDAYS', () => {
        payload = 2
        mutations.DELETE_HOLIDAY(state, payload)

        expect(state.holidays).toHaveLength(2)
      })

      it('should CREATE_HOLIDAY', () => {
        payload = {
          ended_at: '2020-01-09',
          id: 4,
          name: 'quo',
          started_at: '2020-01-05'
        }
        mutations.CREATE_HOLIDAY(state, payload)

        expect(state.holidays).toHaveLength(4)
        expect(state.holidays[3]).toEqual(payload)
      })

      it('should UPDATE_HOLIDAY', () => {
        payload = {
          ended_at: '2020-01-09',
          id: 2,
          name: 'Tet Holiday',
          started_at: '2020-01-05'
        }
        mutations.UPDATE_HOLIDAY(state, payload)

        expect(state.holidays.filter(holiday => holiday.id === payload.id)[0]).toEqual(payload)
      })

      it('should IMPORT_NATIONAL_HOLIDAYS', () => {
        payload = [
          {
            ended_at: '2020-01-09',
            id: 4,
            name: 'Tet Holiday',
            started_at: '2020-01-05'
          },
          {
            ended_at: '2020-01-09',
            id: 5,
            name: 'Quoc Khanh',
            started_at: '2020-01-05'
          }
        ]

        mutations.IMPORT_NATIONAL_HOLIDAYS(state, payload)

        expect(state.holidays).toHaveLength(5)
        expect(state.holidays[4]).toEqual(payload[1])
      })
    })
  })

  describe('wehn errors', () => {
    it('should UPDATE_HOLIDAY_ERRORS', () => {
      payload = {
        errors: { name: 'has been taken' }
      }
      mutations.UPDATE_HOLIDAY_ERRORS(state, payload)

      expect(state.errors).toEqual(payload.errors)
    })

    it('should UPDATE_HOLIDAY_ERRORS', () => {
      mutations.CLEAR_HOLIDAY_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  let response

  describe('when fetchHolidays', () => {
    it('should commit FETCH_HOLIDAYS', async () => {
      response = { data: holidaysData() }
      callApi.mockResolvedValue(response)
      const year = 2020
      await actions.fetchHolidays({ commit }, year)

      expect(commit).toHaveBeenCalledWith('FETCH_HOLIDAYS', response.data)
    })
  })

  describe('when deleteHoliday', () => {
    it('should commit FETCH_HOLIDAYS', async () => {
      response = holidaysData()[0]
      callApi.mockResolvedValue(response)
      const holidayID = 1
      await actions.deleteHoliday({ commit }, holidayID)

      expect(commit).toHaveBeenCalledWith('DELETE_HOLIDAY', holidayID)
    })
  })

  describe('when createHoliday', () => {
    beforeEach(() => {
      response = { data: holidaysData()[0] }
    })

    it('should commit CREATE_HOLIDAY', async () => {
      callApi.mockResolvedValue(response)
      await actions.createHoliday({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith('CREATE_HOLIDAY', response.data)
    })

    it('should commit UPDATE_HOLIDAY_ERRORS', () => {
      // not implement yet
    })
  })

  describe('when updateHoliday', () => {
    beforeEach(() => {
      response = { data: holidaysData()[0] }
    })

    it('should commit CREATE_HOLIDAY', async () => {
      callApi.mockResolvedValue(response)
      await actions.updateHoliday({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith('UPDATE_HOLIDAY', response.data)
    })

    it('should commit UPDATE_HOLIDAY_ERRORS', () => {
      // not implement yet
    })
  })

  describe('when clearHolidayErrors', () => {
    actions.clearHolidayErrors({ commit })

    expect(commit).toHaveBeenCalledWith('CLEAR_HOLIDAY_ERRORS')
  })

  describe('when importNationalHolidays', () => {
    it('should commit nothing', () => {
      actions.importNationalHolidays({ commit }, '')
      expect(commit).not.toHaveBeenCalled()
    })

    it('should commit IMPORT_NATIONAL_HOLIDAYS', async () => {
      response = { data: holidaysData() }
      const country = 'vi'
      callApi.mockResolvedValue(response)
      await actions.importNationalHolidays({ commit }, country)

      expect(commit).toHaveBeenCalledWith('IMPORT_NATIONAL_HOLIDAYS', response.data)
    })
  })
})

describe('getters', () => {
  let holidays, query
  beforeEach(() => { state.holidays = holidaysData() })

  it('should return no holidays', () => {
    query = 'ww'
    holidays = getters.filterHolidays(state)(query)

    expect(holidays).toHaveLength(0)
  })

  it('should return full holidays', () => {
    query = ''
    holidays = getters.filterHolidays(state)(query)

    expect(holidays).toEqual(state.holidays)
  })

  it('should return match holidays', () => {
    query = 'a'
    holidays = getters.filterHolidays(state)(query)

    expect(holidays).toHaveLength(1)
    expect(holidays[0]).toEqual(state.holidays[2])
  })
})
