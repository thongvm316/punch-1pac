import userPassword from '@/store/modules/user-password'
import { userPasswordError } from '../api-data/user-password.api.js'
import { UPDATE_USER_PASSWORD_ERRORS, CLEAR_USER_PASSWORD_ERRORS } from '@/store/mutation-types'
import callApi from '@/store/api-caller'

jest.mock('@/store/api-caller')

const { state, mutations, actions } = userPassword
const commit = jest.fn()

describe('mutations', () => {
  it('UPDATE_USER_PASSWORD_ERRORS', () => {
    state.errors = {}
    const payload = userPasswordError().data

    mutations.UPDATE_USER_PASSWORD_ERRORS(state, payload)

    expect(state.errors).toEqual(payload.errors)
  })

  it('CLEAR_USER_PASSWORD_ERRORS', () => {
    mutations.CLEAR_USER_PASSWORD_ERRORS(state)

    expect(state.errors).toEqual({})
  })
})

describe('actions', () => {
  describe('updatePassword', () => {
    it('reject: should commit UPDATE_USER_PASSWORD_ERRORS', async () => {
      const params = {
        current_password: 'password',
        password_confirmation: 'meowmeow',
        password: 'meowmeow'
      }
      const mockError = { response: userPasswordError() }
      callApi.mockRejectedValue(mockError)

      await actions.updatePassword({ commit }, params)
        .catch(error => {
          expect(error).toEqual(mockError)
          expect(commit).toHaveBeenCalledWith(UPDATE_USER_PASSWORD_ERRORS, error.response.data)
        })
    })
  })

  describe('clearUserPasswordErrors', () => {
    it('should commit CLEAR_USER_PASSWORD_ERRORS', () => {
      actions.clearUserPasswordErrors({ commit })

      expect(commit).toHaveBeenCalledWith(CLEAR_USER_PASSWORD_ERRORS)
    })
  })
})
