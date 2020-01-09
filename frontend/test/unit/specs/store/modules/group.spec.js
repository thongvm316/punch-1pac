import group from '@/store/modules/group'
import callApi from '@/store/api-caller'
import { groupData, anotherGroupData, usersInGroupData, userData, groupError } from '../api-data/group.api.js'
import * as types from '@/store/mutation-types.js'

jest.mock('@/store/api-caller')

const { state, getters, mutations, actions } = group
const commit = jest.fn()

describe('getters', () => {
  it('should filterUsers by name/email', () => {
    // missing
  })
})

describe('mutations', () => {
  describe('when handle group', () => {
    it('RECEIVE_GROUP', () => {
      const payload = groupData()

      mutations.RECEIVE_GROUP(state, payload)

      expect(state.group).toEqual(payload)
    })

    it('UPDATE_GROUP', () => {
      state.group = groupData()
      const payload = anotherGroupData()

      mutations.UPDATE_GROUP(state, payload)

      expect(state.group).toEqual(payload)
    })
  })

  describe('when handle users in group', () => {
    beforeEach(() => {
      state.usersInGroup = usersInGroupData().users
    })

    it('ADD_GROUP_USER', () => {
      const user = userData()
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
      const payload = usersInGroupData()

      mutations.FETCH_USERS_IN_GROUP(state, payload)

      expect(state.usersInGroup).toHaveLength(3)
      expect(state.usersInGroup).toEqual(payload.users)
    })
  })

  describe('when handle errors', () => {
    it('UPDATE_GROUP_ERRORS', () => {
      const payload = groupError().data

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
    it('getGroup: should commit RECEIVE_GROUP', async () => {
      const id = 1
      const response = {
        data: groupData()
      }
      callApi.mockResolvedValue(response)

      await actions.getGroup({ commit, state }, id)

      expect(commit).toHaveBeenCalledWith(types.RECEIVE_GROUP, response.data)
    })

    const params = {
      editParams: {
        name: 'mocking group'
      }
    }

    it('updateGroup resolve: should commit UPDATE_GROUP', async () => {
      const response = { data: groupData() }
      callApi.mockResolvedValue(response)

      await actions.updateGroup({ commit }, params)

      expect(commit).toHaveBeenCalledWith(types.UPDATE_GROUP, response.data)
    })

    it('updateGroup reject: should commit UPDATE_GROUP_ERRORS', async () => {
        const mockError = { response: groupError() }
        callApi.mockRejectedValue(mockError)

        await actions.updateGroup({ commit }, params)
          .catch(error => {
            expect(error).toEqual(mockError)
            expect(commit).toHaveBeenCalledWith(types.UPDATE_GROUP_ERRORS, error.response.data)
          })
      })
  })

  describe('when handle users in group', () => {
    it('addGroupUser: should commit ADD_GROUP_USER', async () => {
      const params = {
        groupId: 1,
        user: userData()
      }
      callApi.mockResolvedValue(null)

      await actions.addGroupUser({ commit }, params)

      expect(commit).toHaveBeenCalledWith(types.ADD_GROUP_USER, params.user)
    })

    it('deactivateGroupUser: should commit DEACTIVATE_GROUP_USER', async () => {
      const userId = 1
      callApi.mockResolvedValue(null)

      await actions.deactivateGroupUser({ commit }, userId)

      expect(commit).toHaveBeenCalledWith(types.DEACTIVATE_GROUP_USER, userId)
    })

    it('activateGroupUser: should commit ACTIVATE_GROUP_USER', async () => {
      const userId = 1
      callApi.mockResolvedValue(null)

      await actions.activateGroupUser({ commit }, userId)

      expect(commit).toHaveBeenCalledWith(types.ACTIVATE_GROUP_USER, userId)
    })

    it('removeGroupUser: should commit REMOVE_GROUP_USER', async () => {
      const params = {
        userId: 1,
        groupId: 1
      }
      callApi.mockResolvedValue(null)

      await actions.removeGroupUser({ commit }, params)

      expect(commit).toHaveBeenCalledWith(types.REMOVE_GROUP_USER, params.userId)
    })

    it('getUsersInGroup: should commit FETCH_USERS_IN_GROUP', async () => {
      const groupId = 1
      const response = { data: usersInGroupData() }
      callApi.mockResolvedValue(response)

      await actions.getUsersInGroup({ commit }, groupId)

      expect(commit).toHaveBeenCalledWith(types.FETCH_USERS_IN_GROUP, response.data)
    })
  })

  describe('when handle errors', () => {
    it('clearGroupErrors: should commit CLEAR_GROUP_ERRORS', () => {
      actions.clearGroupErrors({ commit })

      expect(commit).toHaveBeenCalledWith(types.CLEAR_GROUP_ERRORS)
    })
  })
})
