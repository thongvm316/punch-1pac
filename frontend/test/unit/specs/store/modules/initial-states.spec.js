import initialStates from '@/store/modules/initial-states'
import callApi from '@/store/api-caller'
import { currentUserData, currentCompanyData, initError } from '../api-data/initial-states.api.js'
import { error422 } from '../api-data/promises-error.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions, getters } = initialStates
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when user', () => {
    it('should INITIAL_STATES_SET_USER', () => {
      payload = currentUserData()
      mutations.INITIAL_STATES_SET_USER(state, payload)

      expect(state.currentUser).toEqual(payload)
    })

    it('should INITIAL_STATES_UPDATE_USER', () => {
      payload = Object.assign(currentUserData(), { name: 'moon-hai' })
      mutations.INITIAL_STATES_UPDATE_USER(state, payload)

      expect(state.currentUser).toEqual(payload)
      expect(state.currentUser.name).toBe('moon-hai')
    })

    it('should INITIAL_STATES_UPDATE_PASSWORD_CHANGED', () => {
      payload = true
      mutations.INITIAL_STATES_UPDATE_PASSWORD_CHANGED(state, payload)

      expect(state.currentUser.password_changed).toBe(true)
    })
  })

  describe('when company', () => {
    it('should INITIAL_STATES_SET_COMPANY', () => {
      payload = currentCompanyData()
      mutations.INITIAL_STATES_SET_COMPANY(state, payload)

      expect(state.currentCompany).toEqual(payload)
    })

    it('should INITIAL_STATES_SET_COMPANY', () => {
      payload = Object.assign(currentCompanyData(), { name: '1PAC' })
      mutations.INITIAL_STATES_UPDATE_COMPANY(state, payload)

      expect(state.currentCompany).toEqual(payload)
      expect(state.currentCompany.name).toBe('1PAC')
    })
  })

  describe('when errors', () => {
    it('should INITIAL_STATES_SET_USER_ERRORS', () => {
      payload = { errors: initError() }
      mutations.INITIAL_STATES_SET_USER_ERRORS(state, payload)

      expect(state.userErrors).toEqual(payload.errors)
    })

    it('should INITIAL_STATES_CLEAR_USER_ERRORS', () => {
      mutations.INITIAL_STATES_CLEAR_USER_ERRORS(state, payload)

      expect(state.userErrors).toEqual({})
    })

    it('should INITIAL_STATES_SET_COMPANY_ERRORS', () => {
      payload = { errors: initError() }
      mutations.INITIAL_STATES_SET_COMPANY_ERRORS(state, payload)

      expect(state.companyErrors).toEqual(payload.errors)
    })

    it('should INITIAL_STATES_CLEAR_COMPANY_ERRORS', () => {
      mutations.INITIAL_STATES_CLEAR_COMPANY_ERRORS(state, payload)

      expect(state.companyErrors).toEqual({})
    })
  })

  describe('when meta', () => {
    it('should INITIAL_STATES_SET_META', () => {
      payload = {
        base_url: 'http://localhost:3000',
        csv_template_url: '/public/static/template.csv'
      }
      mutations.INITIAL_STATES_SET_META(state, payload)

      expect(state.meta).toEqual(payload)
    })
  })
})

describe('actions', () => {
  let response
  const mockError = error422()

  describe('when updateUser', () => {
    const params = {
      userParams: {
        name: '1pac',
        image_url: '/'
      }
    }

    it('should commit INITIAL_STATES_UPDATE_USER', async () => {
      response = { data: currentUserData() }
      callApi.mockResolvedValue(response)
      await actions.updateUser({ commit }, params)

      expect(commit).toHaveBeenCalledWith('INITIAL_STATES_UPDATE_USER', response.data)
    })

    it('should commit INITIAL_STATES_SET_USER_ERRORS', async () => {
      callApi.mockRejectedValue(mockError)
      await actions.updateUser({ commit }, params).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('INITIAL_STATES_SET_USER_ERRORS', mockError.response.data)
      })
    })
  })

  describe('when updateCompany', () => {
    const params = {
      name: '1pac',
      image_url: '/'
    }

    it('should commit INITIAL_STATES_UPDATE_COMPANY', async () => {
      response = { data: currentCompanyData() }
      callApi.mockResolvedValue(response)
      await actions.updateCompany({ commit }, params)

      expect(commit).toHaveBeenCalledWith('INITIAL_STATES_UPDATE_COMPANY', response.data)
    })

    it('should commit INITIAL_STATES_SET_COMPANY_ERRORS', async () => {
      callApi.mockRejectedValue(mockError)
      await actions.updateCompany({ commit }, params).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('INITIAL_STATES_SET_COMPANY_ERRORS', mockError.response.data)
      })
    })
  })
})
