import companyHolidays from '@/store/modules/company-holidays'
import Repositories from '@/repository'
import holidaysData from '../../../supports/fixtures/holidays.api'
import error422 from '../../../supports/fixtures/errors.api'
jest.mock('@/repository/company-settings')

const companySettingsRepository = Repositories.get('companySettings')
const { state, mutations, actions, getters } = companyHolidays
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when holidays', () => {
    it('should FETCH_HOLIDAYS', () => {
      payload = [...holidaysData.holidays]
      mutations.FETCH_HOLIDAYS(state, payload)

      expect(state.holidays).toEqual(payload)
    })

    describe('when handle CUD methods', () => {
      beforeEach(() => {
        state.holidays = [...holidaysData.holidays]
      })

      it('should DELETE_HOLIDAYS', () => {
        payload = 2
        mutations.DELETE_HOLIDAY(state, payload)

        expect(state.holidays).toHaveLength(2)
      })

      it('should CREATE_HOLIDAY', () => {
        payload = [...holidaysData.holidays][0]
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
        payload = [...holidaysData.holidays]
        mutations.IMPORT_NATIONAL_HOLIDAYS(state, payload)

        expect(state.holidays).toHaveLength(6)
      })
    })
  })

  describe('when errors', () => {
    it('should UPDATE_HOLIDAY_ERRORS', () => {
      payload = holidaysData.errors
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
      response = { data: [...holidaysData.holidays] }
      companySettingsRepository.getHolidays.mockResolvedValue(response)
      await actions.fetchHolidays({ commit }, 2020)

      expect(commit).toHaveBeenCalledWith('FETCH_HOLIDAYS', response.data)
    })
  })

  describe('when deleteHoliday', () => {
    it('should commit FETCH_HOLIDAYS', async () => {
      response = [...holidaysData.holidays][0]
      companySettingsRepository.deleteHoliday.mockResolvedValue(response)
      await actions.deleteHoliday({ commit }, 1)

      expect(commit).toHaveBeenCalledWith('DELETE_HOLIDAY', 1)
    })
  })

  describe('when createHoliday', () => {
    beforeEach(() => {
      response = { data: [...holidaysData.holidays][0] }
    })

    it('should commit CREATE_HOLIDAY', async () => {
      companySettingsRepository.createHoliday.mockResolvedValue(response)
      await actions.createHoliday({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith('CREATE_HOLIDAY', response.data)
    })

    it('should commit UPDATE_HOLIDAY_ERRORS', async () => {
      const mockError = error422
      companySettingsRepository.createHoliday.mockRejectedValue(mockError)

      await actions.createHoliday({ commit }, response.data).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('UPDATE_HOLIDAY_ERRORS', mockError.response.data)
      })
    })
  })

  describe('when updateHoliday', () => {
    beforeEach(() => {
      response = { data: [...holidaysData.holidays][0] }
    })

    it('should commit CREATE_HOLIDAY', async () => {
      companySettingsRepository.updateHoliday.mockResolvedValue(response)
      await actions.updateHoliday({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith('UPDATE_HOLIDAY', response.data)
    })

    it('should commit UPDATE_HOLIDAY_ERRORS', async () => {
      const mockError = error422
      companySettingsRepository.updateHoliday.mockRejectedValue(mockError)

      await actions.updateHoliday({ commit }, response.data).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('UPDATE_HOLIDAY_ERRORS', mockError.response.data)
      })
    })
  })

  describe('when importNationalHolidays', () => {
    it('should commit nothing', () => {
      actions.importNationalHolidays({ commit }, '')
      expect(commit).not.toHaveBeenCalled()
    })

    it('should commit IMPORT_NATIONAL_HOLIDAYS', async () => {
      response = { data: [...holidaysData.holidays] }
      companySettingsRepository.importNationalHolidays.mockResolvedValue(response)
      await actions.importNationalHolidays({ commit }, 'vi')

      expect(commit).toHaveBeenCalledWith('IMPORT_NATIONAL_HOLIDAYS', response.data)
    })
  })
})

describe('getters', () => {
  let holidays, query
  beforeEach(() => { state.holidays = [...holidaysData.holidays] })

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
