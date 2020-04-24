import initialStates from '@/store/modules/initial-states'
import Repositories from '@/repository'
import initialData from '../../../supports/fixtures/initial-states.api'
import error422 from '../../../supports/fixtures/errors.api'
jest.mock('@/repository/users')
jest.mock('@/repository/company-settings')

const usersRepository = Repositories.get('users')
const companySettingsRepository = Repositories.get('companySettings')
const { state, mutations, actions, getters } = initialStates
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when user', () => {
    it('should INITIAL_STATES_SET_USER', () => {
      payload = { ...initialData.currentUser }
      mutations.INITIAL_STATES_SET_USER(state, payload)

      expect(state.currentUser).toEqual(payload)
    })

    it('should INITIAL_STATES_UPDATE_USER', () => {
      payload = Object.assign({ ...initialData.currentUser }, { name: 'moon-hai' })
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
      payload = { ...initialData.currentCompany }
      mutations.INITIAL_STATES_SET_COMPANY(state, payload)

      expect(state.currentCompany).toEqual(payload)
    })

    it('should INITIAL_STATES_SET_COMPANY', () => {
      payload = Object.assign({ ...initialData.currentCompany }, { name: '1PAC' })
      mutations.INITIAL_STATES_UPDATE_COMPANY(state, payload)

      expect(state.currentCompany).toEqual(payload)
      expect(state.currentCompany.name).toBe('1PAC')
    })
  })

  describe('when errors', () => {
    it('should INITIAL_STATES_SET_USER_ERRORS', () => {
      payload = { errors: initialData.errors }
      mutations.INITIAL_STATES_SET_USER_ERRORS(state, payload)

      expect(state.userErrors).toEqual(payload.errors)
    })

    it('should INITIAL_STATES_CLEAR_USER_ERRORS', () => {
      mutations.INITIAL_STATES_CLEAR_USER_ERRORS(state, payload)

      expect(state.userErrors).toEqual({})
    })

    it('should INITIAL_STATES_SET_COMPANY_ERRORS', () => {
      payload = { errors: initialData.errors }
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
      payload = initialData.meta
      mutations.INITIAL_STATES_SET_META(state, payload)

      expect(state.meta).toEqual(payload)
    })
  })
})

describe('actions', () => {
  let response
  const mockError = error422
  const params = {
    name: '1pac',
    image_url: '/'
  }

  describe('when updateUser', () => {
    it('should commit INITIAL_STATES_UPDATE_USER', async () => {
      response = { data: { ...initialData.currentUser } }
      usersRepository.updateUser.mockResolvedValue(response)
      await actions.updateUser({ commit }, { userParams: params })

      expect(commit).toHaveBeenCalledWith('INITIAL_STATES_UPDATE_USER', response.data)
    })

    it('should commit INITIAL_STATES_SET_USER_ERRORS', async () => {
      usersRepository.updateUser.mockRejectedValue(mockError)

      await actions.updateUser({ commit }, { userParams: params }).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('INITIAL_STATES_SET_USER_ERRORS', mockError.response.data)
      })
    })
  })

  describe('when updateCompany', () => {
    it('should commit INITIAL_STATES_UPDATE_COMPANY', async () => {
      response = { data: { ...initialData.currentCompany } }
      companySettingsRepository.updateCompany.mockResolvedValue(response)
      await actions.updateCompany({ commit }, params)

      expect(commit).toHaveBeenCalledWith('INITIAL_STATES_UPDATE_COMPANY', response.data)
    })

    // it('should commit INITIAL_STATES_SET_COMPANY_ERRORS', async () => {
    //   companySettingsRepository.updateCompany.mockRejectedValue(mockError)

    //   await actions.updateCompany({ commit }, params).catch(error => {
    //     expect(error).toEqual(mockError)
    //     expect(commit).toHaveBeenCalledWith('INITIAL_STATES_SET_COMPANY_ERRORS', mockError.response.data)
    //   })
    // })
  })
})
