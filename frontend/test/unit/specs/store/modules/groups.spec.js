import groups from '@/store/modules/groups'
import callApi from '@/store/api-caller'
import { groupsData, groupsError } from '../api-data/groups.api.js'
import { error422 } from '../api-data/promises-error.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions, getters } = groups
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when RECEIVE_GROUPS', () => {
    it('should RECEIVE_GROUPS', () => {
      payload = groupsData()
      mutations.RECEIVE_GROUPS(state, payload)

      expect(state.groups).toEqual(payload)
    })
  })

  describe('when ADD_GROUP', () => {
    beforeEach(() => { state.groups = groupsData() })

    it('should ADD_GROUP', () => {
      payload = groupsData()[0]
      mutations.ADD_GROUP(state, payload)

      expect(state.groups).toHaveLength(4)
      expect(state.groups[3]).toEqual(payload)
    })
  })

  describe('when UPDATE_GROUPS_ERRORS', () => {
    it('should UPDATE_GROUPS_ERRORS', () => {
      payload = { errors: groupsError() }
      mutations.UPDATE_GROUPS_ERRORS(state, payload)

      expect(state.errors).toEqual(payload.errors)
    })
  })

  describe('when CLEAR_GROUPS_ERRORS', () => {
    it('should CLEAR_GROUPS_ERRORS', () => {
      mutations.CLEAR_GROUPS_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  let response

  describe('when getGroups', () => {
    it('should commit RECEIVE_GROUPS', async () => {
      response = { data: groupsData() }
      callApi.mockResolvedValue(response)
      await actions.getGroups({ commit })

      expect(commit).toHaveBeenCalledWith('RECEIVE_GROUPS', response.data)
    })
  })

  describe('when addGroup', () => {
    const params = {
      name: 'abc',
      image_url: '/',
      description: 'xyz'
    }

    it('should commit ADD_GROUP', async () => {
      response = { data: groupsData() }
      callApi.mockResolvedValue(response)
      await actions.addGroup({ commit }, params)

      expect(commit).toHaveBeenCalledWith('ADD_GROUP', response.data)
    })

    it('should commit UPDATE_GROUPS_ERRORS', async () => {
      const mockError = error422()
      callApi.mockRejectedValue(mockError)

      await actions.addGroup({ commit }, params).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('UPDATE_GROUPS_ERRORS', mockError.response.data)
      })
    })
  })
})

describe('getters', () => {
  describe('when filterGroups', () => {
    let query, groups

    beforeEach(() => { state.groups = groupsData() })

    it('should return 0 groups match', () => {
      query = 'xxx'
      groups = getters.filterGroups(state)(query)

      expect(groups).toHaveLength(0)
    })

    it('should return groups match', () => {
      query = 'e'
      groups = getters.filterGroups(state)(query)

      expect(groups).toHaveLength(2)
    })

    it('should return all groups', () => {
      query = ''
      groups = getters.filterGroups(state)(query)

      expect(groups).toHaveLength(3)
    })
  })
})
