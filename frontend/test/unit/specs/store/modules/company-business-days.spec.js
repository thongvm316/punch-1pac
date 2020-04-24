import companyBusinessDays from '@/store/modules/company-business-days'
import Repositories from '@/repository'
import companyBusinessDaysData from '../../../supports/fixtures/business-days.api'
import error422 from '../../../supports/fixtures/errors.api'
import * as types from '@/store/mutation-types.js'
jest.mock('@/repository/company-settings')

const companySettingsRepository = Repositories.get('companySettings')
const { state, mutations, actions } = companyBusinessDays
const commit = jest.fn()

describe('mutations', () => {
  it('FETCH_BUSINESS_DAYS', () => {
    const payload = [...companyBusinessDaysData.businessDays]
    mutations.FETCH_BUSINESS_DAYS(state, payload)

    expect(state.businessDays).toHaveLength(3)
    expect(state.businessDays).toEqual(payload)
  })

  describe('when handle CUD methods', () => {
    beforeEach(() => {
      state.businessDays = [...companyBusinessDaysData.businessDays]
    })

    it('ADD_BUSINESS_DAY', () => {
      const payload = [...companyBusinessDaysData.businessDays][0]
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
        errors: companyBusinessDaysData.errors
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
      const response = { data: [...companyBusinessDaysData.businessDays] }
      companySettingsRepository.getBusinessDays.mockResolvedValue(response)

      await actions.fetchBusinessDays({ commit })

      expect(commit).toHaveBeenCalledWith(types.FETCH_BUSINESS_DAYS, response.data)
    })
  })

  describe('when addBusinessDay', () => {
    const response = {
      data: [...companyBusinessDaysData.businessDays][0]
    }

    it('resolve: should commit ADD_BUSINESS_DAY', async () => {
      companySettingsRepository.addBusinessDay.mockResolvedValue(response)

      await actions.addBusinessDay({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith(types.ADD_BUSINESS_DAY, response.data)
    })

    it('reject: should commit UPDATE_BUSINESS_DAY_ERRORS', async () => {
      const mockError = error422
      companySettingsRepository.addBusinessDay.mockRejectedValue(mockError)

      await actions.addBusinessDay({ commit }, response.data).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
      })
    })
  })

  describe('when deleteBusinessDay', () => {
    it('resolve: should commit DELETE_BUSINESS_DAY', async () => {
      const id = 1
      companySettingsRepository.deleteBusinessDay.mockResolvedValue(null)

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
        data: [...companyBusinessDaysData.businessDays][1]
      }
      companySettingsRepository.updateBusinessDay.mockResolvedValue(response)

      await actions.updateBusinessDay({ commit }, params)

      expect(commit).toHaveBeenCalledWith(types.UPDATE_BUSINESS_DAY, response.data)
    })

    it('reject: should commit UPDATE_BUSINESS_DAY_ERRORS', async () => {
      const mockError = error422
      companySettingsRepository.updateBusinessDay.mockRejectedValue(mockError)

      await actions.updateBusinessDay({ commit }, params).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith(types.UPDATE_BUSINESS_DAY_ERRORS, error.response.data)
      })
    })
  })
})
