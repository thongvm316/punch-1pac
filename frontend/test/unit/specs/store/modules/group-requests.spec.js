import groupRequests from '@/store/modules/group-requests.js'
import Repositories from '@/repository'
import requestsData from '../../../supports/fixtures/group-requests.api'
import error422 from '../../../supports/fixtures/errors.api'
jest.mock('@/repository/requests')

const requestsRepository = Repositories.get('requests')
const { state, mutations, actions } = groupRequests
const commit = jest.fn()

describe('mutations', () => {
  let payload

  it('should RECEIVE_GROUP_REQUESTS', () => {
    payload = { ...requestsData }
    mutations.RECEIVE_GROUP_REQUESTS(state, payload)

    expect(state.pager).toEqual(payload.meta)
    expect(state.requests).toEqual(payload.requests)
  })

  describe('when handle requests', () => {
    beforeEach(() => { state.requests = [...requestsData.requests] })

    it('should APPROVE_GROUP_REQUEST', () => {
      payload = 2
      mutations.APPROVE_GROUP_REQUEST(state, payload)

      expect(state.requests.filter(request => request.id === payload)[0].status).toEqual('approved')
    })

    it('should REJECT_GROUP_REQUEST', () => {
      payload = {
        admin: {
          email: 'abc@abc.com',
          name: 'bcs'
        },
        admin_reason: 'not good',
        requestId: 1
      }
      mutations.REJECT_GROUP_REQUEST(state, payload)

      let request = state.requests.filter(request => request.id === payload.requestId)[0]
      expect(request.status).toEqual('rejected')
      expect(request.admin).toEqual(payload.admin)
      expect(request.admin_reason).toEqual(payload.admin_reason)
    })
  })

  describe('when errors', () => {
    it('should REJECT_GROUP_REQUEST_ERRORS', () => {
      payload = { errors: requestsData.errors }
      mutations.REJECT_GROUP_REQUEST_ERRORS(state, payload)

      expect(state.errors).toEqual(payload.errors)
    })

    it('should CLEAR_REJECT_GROUP_REQUEST_ERRORS', () => {
      mutations.CLEAR_REJECT_GROUP_REQUEST_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  let response

  describe('when getRequests', () => {
    it('should commit RECEIVE_GROUP_REQUESTS', async () => {
      response = { data: { ...requestsData } }
      requestsRepository.getRequests.mockResolvedValue(response)
      await actions.getRequests({ commit }, {})

      expect(commit).toHaveBeenCalledWith('RECEIVE_GROUP_REQUESTS', response.data)
    })
  })

  describe('when approveRequest', () => {
    it('should commit APPROVE_GROUP_REQUESTS', async () => {
      response = { data: { ...requestsData } }
      requestsRepository.approveRequest.mockResolvedValue(response)
      const requestId = 1
      await actions.approveRequest({ commit }, requestId)

      expect(commit).toHaveBeenCalledWith('APPROVE_GROUP_REQUEST', requestId)
    })
  })

  describe('when rejectRequest', () => {
    const params = { admin_reason: 'not good' }

    it('should commit REJECT_GROUP_REQUESTS', async () => {
      response = { data: { ...requestsData } }
      requestsRepository.rejectRequest.mockResolvedValue(response)
      await actions.rejectRequest({ commit }, params)

      expect(commit).toHaveBeenCalledWith('REJECT_GROUP_REQUEST', params)
    })

    it('shoud commit REJECT_GROUP_REQUEST_ERRORS', async () => {
      const mockError = error422
      requestsRepository.rejectRequest.mockRejectedValue(mockError)

      await actions.rejectRequest({ commit }, params).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('REJECT_GROUP_REQUEST_ERRORS', mockError.response.data)
      })
    })
  })
})
