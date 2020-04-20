import groupPendingRequests from '@/store/modules/group-pending-requests.js'
import Repositories from '@/repository'
import pendingRequestsData from '../../../supports/fixtures/pending-requests.api'
jest.mock('@/repository/users')

const usersRepository = Repositories.get('users')
const { state, mutations, actions } = groupPendingRequests
const commit = jest.fn()

describe('mutations', () => {
  it('should RECEVIE_GROUP_PENDING_REQUESTS', () => {
    const payload = [...pendingRequestsData.requests]
    mutations.RECEVIE_GROUP_PENDING_REQUESTS(state, payload)

    expect(state.pendingRequests).toEqual(payload)
  })
})

describe('actions', () => {
  describe('when getGroupPendingRequests', () => {
    it('should commit RECEVIE_GROUP_PENDING_REQUESTS', async () => {
      const response = { data: [...pendingRequestsData.requests] }
      usersRepository.getGroupPendingRequests.mockResolvedValue(response)
      await actions.getGroupPendingRequests({ commit })

      expect(commit).toHaveBeenCalledWith('RECEVIE_GROUP_PENDING_REQUESTS', response.data)
    })
  })
})
