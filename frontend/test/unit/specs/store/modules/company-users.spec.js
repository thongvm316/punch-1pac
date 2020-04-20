import companyUsers from '@/store/modules/company-users'
import Repositories from '@/repository'
import usersData from '../../../supports/fixtures/users.api'
jest.mock('@/repository/users')

const usersRepository = Repositories.get('users')
const { state, mutations, actions, getters } = companyUsers
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when FETCH_USERS', () => {
    it('should FETCH_USERS', () => {
      payload = [...usersData.users]
      mutations.FETCH_USERS(state, payload)

      expect(state.users).toEqual(payload.users)
    })
  })

  describe('when CUD methods', () => {
    beforeEach(() => {
      state.users = [...usersData.users]
    })

    it('should CREATE_USER', () => {
      payload = [...usersData.users][0]
      mutations.CREATE_USER(state, payload)

      expect(state.users).toHaveLength(4)
    })

    it('should DELETE_USER', () => {
      const id = 2
      mutations.DELETE_USER(state, id)

      expect(state.users).toHaveLength(2)
    })

    it('should UPDATE_USER', () => {
      payload = {
        activated: true,
        activated_at: '2020-01-01',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        created_at: '2020-01-01',
        deactivated_at: null,
        email: 'hai@pac.vn',
        gender: 'male',
        id: 1,
        language: 'ja',
        name: 'Dinh hai',
        owner: false,
        password_changed: false,
        position: 'Developer',
        role: 'member'
      }
      mutations.UPDATE_USER(state, payload)

      expect(state.users.filter(user => user.id === payload.id)[0]).toEqual(payload)
    })

    it('should DEACTIVATE_USER', () => {
      const userId = 2
      mutations.DEACTIVATE_USER(state, userId)

      expect(state.users.filter(user => user.id === userId)[0].activated).toBe(false)
    })

    it('should DEACTIVATE_USER', () => {
      const userId = 1
      mutations.ACTIVATE_USER(state, userId)

      expect(state.users.filter(user => user.id === userId)[0].activated).toBe(true)
    })
  })
})

describe('actions', () => {
  let response
  const userId = 2

  describe('when fetchUsers', () => {
    it('should commit FETCH_USERS', async () => {
      response = { data: [...usersData.users] }
      usersRepository.getUsers.mockResolvedValue(response)
      await actions.fetchUsers({ commit }, {})

      expect(commit).toHaveBeenCalledWith('FETCH_USERS', response.data)
    })
  })

  describe('when deleteUser', () => {
    it('should commit DELETE_USER', async () => {
      response = { data: [...usersData.users] }
      usersRepository.deleteUser.mockResolvedValue(response)
      await actions.deleteUser({ commit }, userId)

      expect(commit).toHaveBeenCalledWith('DELETE_USER', userId)
    })
  })

  describe('when deactivateUser', () => {
    it('should commit DEACTIVATE_USER', async () => {
      response = { data: [...usersData.users] }
      usersRepository.deactivateUser.mockResolvedValue(response)
      await actions.deactivateUser({ commit }, userId)

      expect(commit).toHaveBeenCalledWith('DEACTIVATE_USER', userId)
    })
  })

  describe('when activateUser', () => {
    it('should commit ACTIVATE_USER', async () => {
      response = { data: [...usersData.users] }
      usersRepository.activateUser.mockResolvedValue(response)
      await actions.activateUser({ commit }, userId)

      expect(commit).toHaveBeenCalledWith('ACTIVATE_USER', userId)
    })
  })
})

describe('getters', () => {
  let users, query
  beforeEach(() => { state.users = [...usersData.users] })

  it('should return no users', () => {
    query = 'www'
    users = getters.filterByEmail(state)(query)

    expect(users).toHaveLength(0)
  })

  it('should return match users', () => {
    query = 'Clara'
    users = getters.filterByEmail(state)(query)

    expect(users).toHaveLength(2)
  })

  it('should return all users', () => {
    query = ''
    users = getters.filterByEmail(state)(query)

    expect(users).toHaveLength(state.users.length)
  })
})
