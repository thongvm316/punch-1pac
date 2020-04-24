import requests from '@/store/modules/requests'
import requestsData from '../../../supports/fixtures/requests.api'
import error422 from '../../../supports/fixtures/errors.api'
import * as types from '@/store/mutation-types'
import Repositories from '@/repository'
jest.mock('@/repository/requests')

const requestsRepository = Repositories.get('requests')
const { state, mutations, actions } = requests
const commit = jest.fn()

describe('mutations', () => {
  describe('requests CRUD handlers', () => {
    beforeEach(() => {
      state.requests = [...requestsData.requests]
    })

    it('ADD_REQUEST', () => {
      const payload = [...requestsData.requests][0]

      mutations.ADD_REQUEST(state, payload)

      expect(state.requests).toHaveLength(4)
      expect(state.requests).toContainEqual(payload)
    })

    it('UPDATE_REQUEST', () => {
      const payload = {...requestsData.requestUpdate}

      mutations.UPDATE_REQUEST(state, payload)

      expect(state.requests).toHaveLength(3)
      expect(state.requests).toContainEqual(payload)
    })

    it('RECEIVE_REQUESTS', () => {
      state.requests = []
      state.pager = {}
      const payload = {
        requests: [...requestsData.requests],
        meta: requestsData.meta
      }

      mutations.RECEIVE_REQUESTS(state, payload)

      expect(state.requests).toEqual(payload.requests)
      expect(state.pager).toEqual(payload.meta)
    })

    it('DELETE_REQUEST', () => {
      const id = 2

      mutations.DELETE_REQUEST(state, id)

      expect(state.requests).toHaveLength(2)
      expect(state.requests).not.toContainEqual(
        expect.objectContaining({ id })
      )
    })
  })

  describe('error handlers', () => {
    it('UPDATE_REQUEST_ERRORS', () => {
      const payload = { errors: requestsData.errors }

      mutations.UPDATE_REQUEST_ERRORS(state, payload)

      expect(state.errors).toEqual(payload.errors)
    })

    it('CLEAR_REQUEST_ERRORS', () => {
      mutations.CLEAR_REQUEST_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  describe('requests CRUD handlers', () => {
    describe('getRequests', () => {
      it('should commit RECEIVE_REQUESTS', async () => {
        const response = { data: { ...requestsData } }
        requestsRepository.getRequests.mockResolvedValue(response)

        await actions.getRequests({ commit, state })

        expect(commit).toHaveBeenCalledWith(types.RECEIVE_REQUESTS, response.data)
      })
    })

    describe('addRequest', () => {
      const params = {
        attendance_day: '2020-01-23',
        reason: 'nnnn',
        kind: 'annual_leave'
      }

      it('resolve: should commit ADD_REQUEST', async () => {
        const response = { data: [...requestsData.requests][0] }
        requestsRepository.addRequest.mockResolvedValue(response)

        await actions.addRequest({ commit }, params)

        expect(commit).toHaveBeenCalledWith(types.ADD_REQUEST, response.data)
      })

      it('reject: should commit UPDATE_REQUEST_ERRORS', async () => {
        const mockError = error422
        requestsRepository.addRequest.mockRejectedValue(mockError)

        await actions.addRequest({ commit }, params)
          .catch(error => {
            expect(error).toEqual(mockError)
            expect(commit).toHaveBeenCalledWith(types.UPDATE_REQUEST_ERRORS, error.response.data)
          })
      })
    })

    describe('updateRequest', () => {
      const request = {
        id: 1,
        params: {
          reason: 'autem'
        }
      }

      it('resolve: should commit UPDATE_REQUEST', async () => {
        const response = { data: requestsData.requestUpdate }
        requestsRepository.updateRequest.mockResolvedValue(response)

        await actions.updateRequest({ commit }, request)

        expect(commit).toHaveBeenCalledWith(types.UPDATE_REQUEST, response.data)
      })

      it('reject: should commit UPDATE_REQUEST_ERRORS', async () => {
        const mockError = error422
        requestsRepository.updateRequest.mockRejectedValue(mockError)

        await actions.updateRequest({ commit }, request)
          .catch(error => {
            expect(error).toEqual(mockError)
            expect(commit).toHaveBeenCalledWith(types.UPDATE_REQUEST_ERRORS, error.response.data)
          })
      })
    })

    describe('deleteRequest', () => {
      it('should commit DELETE_REQUEST', async () => {
        const id = 1
        requestsRepository.deleteRequest.mockResolvedValue(null)

        await actions.deleteRequest({ commit }, id)

        expect(commit).toHaveBeenCalledWith(types.DELETE_REQUEST, id)
      })
    })
  })
})
