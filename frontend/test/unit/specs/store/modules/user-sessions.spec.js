import userSession from '@/store/modules/user-sessions'
import userSessionsData from '../../../supports/fixtures/sessions.api'
import { DELETE_SESSION, FETCH_SESSIONS } from '@/store/mutation-types'
import Repositories from '@/repository'
jest.mock('@/repository/users')

const usersRepository = Repositories.get('users')
const { state, mutations, actions } = userSession
const commit = jest.fn()

describe('mutations', () => {
  it('FETCH_SESSIONS', () => {
    state.sessions = []
    state.currentSession = {}
    const payload = { ...userSessionsData }

    mutations.FETCH_SESSIONS(state, payload)

    expect(state.sessions).toEqual(payload.sessions)
    expect(state.currentSession).toEqual(payload.meta)
  })

  it('DELETE_SESSION', () => {
    state.sessions = [...userSessionsData.sessions]
    const id = 2

    mutations.DELETE_SESSION(state, id)

    expect(state.sessions).toHaveLength(2)
    expect(state.sessions).not.toContainEqual(
      expect.objectContaining({ id })
    )
  })
})

describe('actions', () => {
  it('fetchSessions: should commit FETCH_SESSIONS', async () => {
    const response = { data: { ...userSessionsData } }
    usersRepository.getSessions.mockResolvedValue(response)

    await actions.fetchSessions({ commit })

    expect(commit).toHaveBeenCalledWith(FETCH_SESSIONS, response.data)
  })

  it('deleteSession: should commit DELETE_SESSION', async () => {
    const id = 1
    usersRepository.deleteSession.mockResolvedValue(null)

    await actions.deleteSession({ commit }, id)

    expect(commit).toHaveBeenCalledWith(DELETE_SESSION, id)
  })
})
