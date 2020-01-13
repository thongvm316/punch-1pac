import companyBusinessDays from '@/store/modules/company-business-days'
import callApi from '@/store/api-caller'
import { companyBusinessDaysData, companyBusinessDaysError } from '../api-data/company-business-days.api.js'
import * as types from '@/store/mutation-types.js'

jest.mock('@/store/api-caller')

const { state, mutations, actions } = companyBusinessDays
const commit = jest.fn()

describe('mutations', () => {
  it('FETCH_BUSINESS_DAYS', () => {
    const payload = companyBusinessDaysData()

    mutations.FETCH_BUSINESS_DAYS(state, payload)

    expect(state.businessDays).toHaveLength(3)
    expect(state.businessDays).toEqual(payload)
  })

  describe('when handle CUD methods', () => {
    beforeEach(() => {
      state.businessDays = companyBusinessDaysData()
    })

    it('ADD_BUSINESS_DAY', () => {
      const payload = {
        id: 4,
        weekday: 'thursday',
        morning_started_at: '08:00',
        morning_ended_at: '12:00',
        afternoon_started_at: '13:30',
        afternoon_ended_at: '17:30'
      }

      mutations.ADD_BUSINESS_DAY(state, payload)

      expect(state.businessDays).toHaveLength(4)
      expect(state.businessDays).toContain(payload)
    })

    it('DELETE_BUSINESS_DAY', () => {
      const id = 2

      mutations.DELETE_BUSINESS_DAY(state, id)

      expect(state.businessDays).toHaveLength(2)
      expect(state.businessDays).not.toContainEqual(expect.objectContaining({ id }))
    })

    it('UPDATE_BUSINESS_DAY', () => {
      const payload = {
        id: 1,
        weekday: 'monday',
        morning_started_at: '09:00',
        morning_ended_at: '12:00',
        afternoon_started_at: '13:30',
        afternoon_ended_at: '17:30'
      }

      mutations.UPDATE_BUSINESS_DAY(state, payload)

      expect(state.businessDays).toHaveLength(3)
      expect(state.businessDays).toContainEqual(payload)
    })
  })

  describe('when errors', () => {
    it('UPDATE_BUSINESS_DAY_ERRORS', () => {
      const payload = {
        message: 'Unprocessable Entity',
        errors: {
          weekday: [ 'không thể để trắng', 'không có trong danh sách' ]
        }
      }

      mutations.UPDATE_BUSINESS_DAY_ERRORS(state, payload)

      expect(state.errors).toEqual(payload.errors)
    })

    it('CLEAR_BUSINESS_DAY_ERRORS', () => {
      mutations.CLEAR_BUSINESS_DAY_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  describe('when fetchBusinessDays', () => {
    it('resolve: should commit FETCH_BUSINESS_DAYS', async () => {
      const response = { data: companyBusinessDaysData() }
      callApi.mockResolvedValue(response)

      await actions.fetchBusinessDays({ commit })

      expect(commit).toHaveBeenCalledWith(types.FETCH_BUSINESS_DAYS, response.data)
    })
  })

  describe('when addBusinessDay', () => {
    const response = {
      data: {
        id: 4,
        weekday: 'sunday',
        morning_started_at: '08:00',
        morning_ended_at: '12:00',
        afternoon_started_at: '13:30',
        afternoon_ended_at: '17:30'
      }
    }

    it('resolve: should commit ADD_BUSINESS_DAY', async () => {
      callApi.mockResolvedValue(response)

      await actions.addBusinessDay({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith(types.ADD_BUSINESS_DAY, response.data)
    })

    it('reject: should commit UPDATE_BUSINESS_DAY_ERRORS', async () => {
      const mockError = companyBusinessDaysError()

      callApi.mockRejectedValue(mockError)

      await actions.addBusinessDay({ commit }, response.data).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
      })
    })
  })

  describe('when deleteBusinessDay', () => {
    it('resolve: should commit DELETE_BUSINESS_DAY', async () => {
      let id = 1
      callApi.mockResolvedValue(null)

      await actions.deleteBusinessDay({ commit }, id)

      expect(commit).toHaveBeenCalledWith(types.DELETE_BUSINESS_DAY, id)
    })
  })

  describe('when updateBusinessDay', () => {
    const params = {
      businessDayId: 1,
      updateParams: {
        weekday: 'sunday'
      }
    }

    it('resolve: should commit UPDATE_BUSINESS_DAY', async () => {
      const response = {
        data: {
          id: 1,
          weekday: 'sunday',
          morning_started_at: '08:00',
          morning_ended_at: '12:00',
          afternoon_started_at: '13:30',
          afternoon_ended_at: '17:30'
        }
      }
      callApi.mockResolvedValue(response)

      await actions.updateBusinessDay({ commit }, params)

      expect(commit).toHaveBeenCalledWith(types.UPDATE_BUSINESS_DAY, response.data)
    })

    it('reject: should commit UPDATE_BUSINESS_DAY_ERRORS', async () => {
      const mockError = companyBusinessDaysError()

      callApi.mockRejectedValue(mockError)

      await actions.updateBusinessDay({ commit }, params).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
      })
    })
  })
})
