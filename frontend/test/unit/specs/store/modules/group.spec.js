import group from '@/store/modules/group'
import Repositories from '@/repository'
import groupsData from '../../../supports/fixtures/groups.api'
import usersData from '../../../supports/fixtures/users.api'
import errorsData from '../../../supports/fixtures/errors.api'
import * as types from '@/store/mutation-types.js'
jest.mock('@/repository/groups')
jest.mock('@/repository/users')

const groupsRepository = Repositories.get('groups')
const usersRepository = Repositories.get('users')

const { state, getters, mutations, actions } = group
const commit = jest.fn()

describe('getters', () => {
  describe('filterUsers by name/email', () => {
    beforeEach(() => {
      state.usersInGroup = [...usersData.users]
    })

    it('should return 2 users', () => {
      const query = 'clara'
      const users = getters.filterUsers(state)(query)

      expect(users).toHaveLength(2)
      users.forEach(user => {
        expect(user.name).toEqual(
          expect.stringMatching(new RegExp(query, 'i'))
        )
      })
    })

    it('should return 0 user', () => {
      const query = 'oops'
      const users = getters.filterUsers(state)(query)

      expect(users).toHaveLength(0)
    })

    it('should return all users', () => {
      const query = ''
      const users = getters.filterUsers(state)(query)

      expect(users).toHaveLength(3)
      expect(users).toEqual(state.usersInGroup)
    })
  })
})

describe('mutations', () => {
  describe('when handle group', () => {
    it('RECEIVE_GROUP', () => {
      const payload = [...groupsData.groups]
      mutations.RECEIVE_GROUP(state, payload)

      expect(state.group).toEqual(payload)
    })

    it('UPDATE_GROUP', () => {
      state.group = [...groupsData.groups]
      const payload = [...groupsData.groups][1]
      mutations.UPDATE_GROUP(state, payload)

      expect(state.group).toEqual(payload)
    })
  })

  describe('when handle users in group', () => {
    beforeEach(() => {
      state.usersInGroup = [...usersData.users]
    })

    it('ADD_GROUP_USER', () => {
      const user = [...usersData.users][0]
      mutations.ADD_GROUP_USER(state, user)

      expect(state.usersInGroup).toHaveLength(4)
      expect(state.usersInGroup).toContainEqual(user)
    })

    it('DEACTIVATE_GROUP_USER', () => {
      const id = 1
      mutations.DEACTIVATE_GROUP_USER(state, id)

      expect(state.usersInGroup).toHaveLength(3)
      expect(state.usersInGroup).toContainEqual(
        expect.objectContaining({ id, activated: false })
      )
    })

    it('ACTIVATE_GROUP_USER', () => {
      const id = 2
      mutations.ACTIVATE_GROUP_USER(state, id)

      expect(state.usersInGroup).toHaveLength(3)
      expect(state.usersInGroup).toContainEqual(
        expect.objectContaining({ id, activated: true })
      )
    })

    it('UPDATE_GROUP_USER', () => {
      const user = {
        id: 1,
        email: 'example@1pac.vn',
        name: 'Mocking Bird',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        gender: 'male',
        position: 'Backend Developer',
        owner: false,
        role: 'superadmin',
        language: 'en',
        password_changed: false,
        activated: true,
        activated_at: '2020-01-01',
        deactivated_at: null,
        created_at: '2020-01-01'
      }

      mutations.UPDATE_GROUP_USER(state, user)

      expect(state.usersInGroup).toHaveLength(3)
      expect(state.usersInGroup).toContainEqual(
        expect.objectContaining({ id: user.id, name: 'Mocking Bird' })
      )
    })

    it('REMOVE_GROUP_USER', () => {
      const id = 1
      mutations.REMOVE_GROUP_USER(state, id)

      expect(state.usersInGroup).toHaveLength(2)
      expect(state.usersInGroup).not.toContainEqual(
        expect.objectContaining({ id })
      )
    })

    it('FETCH_USERS_IN_GROUP', () => {
      state.usersInGroup = []
      const payload = {...usersData}
      mutations.FETCH_USERS_IN_GROUP(state, payload)

      expect(state.usersInGroup).toHaveLength(3)
      expect(state.usersInGroup).toEqual(payload.users)
    })
  })

  describe('when handle errors', () => {
    it('UPDATE_GROUP_ERRORS', () => {
      const payload = [...groupsData.errors]
      mutations.UPDATE_GROUP_ERRORS(state, payload)

      expect(state.errors).toEqual(payload.errors)
    })

    it('CLEAR_GROUP_ERRORS', () => {
      mutations.CLEAR_GROUP_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  describe('when handle group', () => {
    const response = {
      data: [...groupsData.groups][0]
    }
    const params = {
      editParams: {
        name: 'mocking group'
      }
    }
    const id = 1

    describe('when fetch Group', () => {
      it('should commit RECEIVE_GROUP', async () => {
        groupsRepository.getGroup.mockResolvedValue(response)

        await actions.getGroup({ commit }, id)

        expect(commit).toHaveBeenCalledWith(types.RECEIVE_GROUP, response.data)
      })
    })

    describe('when edtit Group', () => {
      it('updateGroup resolve: should commit UPDATE_GROUP', async () => {
        const response = { data: [...groupsData.groups][0] }
        groupsRepository.updateGroup.mockResolvedValue(response)

        await actions.updateGroup({ commit }, params)

        expect(commit).toHaveBeenCalledWith(types.UPDATE_GROUP, response.data)
      })

      it('updateGroup reject: should commit UPDATE_GROUP_ERRORS', async () => {
        const mockError = errorsData
        groupsRepository.updateGroup.mockRejectedValue(mockError)

        await actions.updateGroup({ commit }, params)
          .catch(error => {
            expect(error).toEqual(mockError)
            expect(commit).toHaveBeenCalledWith(types.UPDATE_GROUP_ERRORS, error.response.data)
          })
      })
    })
  })

  describe('when handle users in group', () => {
    const userId = 1
    const groupId = 1

    describe('when getUsersInGroup', () => {
      it('getUsersInGroup: should commit FETCH_USERS_IN_GROUP', async () => {
        const response = { data: [...usersData.users] }
        usersRepository.getUsers.mockResolvedValue(response)

        await actions.getUsersInGroup({ commit }, groupId)

        expect(commit).toHaveBeenCalledWith(types.FETCH_USERS_IN_GROUP, response.data)
      })
    })

    describe('when addGroupUser', () => {
      it('should commit ADD_GROUP_USER', async () => {
        const params = {
          groupId,
          user: [...usersData.users][0]
        }
        groupsRepository.addGroupUser.mockResolvedValue(null)

        await actions.addGroupUser({ commit }, params)

        expect(commit).toHaveBeenCalledWith(types.ADD_GROUP_USER, params.user)
      })
    })

    describe('when removeGroupUser', () => {
      it('should commit REMOVE_GROUP_USER', async () => {
        const params = {
          userId,
          groupId
        }
        groupsRepository.removeGroupUser.mockResolvedValue(null)

        await actions.removeGroupUser({ commit }, params)

        expect(commit).toHaveBeenCalledWith(types.REMOVE_GROUP_USER, params.userId)
      })
    })

    describe('when deactivateGroupUser', () => {
      it('should commit DEACTIVATE_GROUP_USER', async () => {
        usersRepository.deactivateUser.mockResolvedValue(null)

        await actions.deactivateGroupUser({ commit }, userId)

        expect(commit).toHaveBeenCalledWith(types.DEACTIVATE_GROUP_USER, userId)
      })
    })

    describe('when activateGroupUser', () => {
      it('activateGroupUser: should commit ACTIVATE_GROUP_USER', async () => {
        usersRepository.activateUser.mockResolvedValue(null)

        await actions.activateGroupUser({ commit }, userId)

        expect(commit).toHaveBeenCalledWith(types.ACTIVATE_GROUP_USER, userId)
      })
    })
  })
})
