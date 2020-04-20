import userPassword from '@/store/modules/user-password'
import error422 from '../../../supports/fixtures/errors.api'
import { UPDATE_USER_PASSWORD_ERRORS } from '@/store/mutation-types'
import Repositories from '@/repository'
jest.mock('@/repository/users')

const usersRepository = Repositories.get('users')
const { state, mutations, actions } = userPassword
const commit = jest.fn()

describe('mutations', () => {
  it('UPDATE_USER_PASSWORD_ERRORS', () => {
    const payload = error422

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
      const mockError = error422
      usersRepository.updatePassword.mockRejectedValue(mockError)

      await actions.updatePassword({ commit }, params)
        .catch(error => {
          expect(error).toEqual(mockError)
          expect(commit).toHaveBeenCalledWith(UPDATE_USER_PASSWORD_ERRORS, error.response.data)
        })
    })
  })
})
