import groupPendingRequests from '@/store/modules/group-pending-requests.js'
import callApi from '@/store/api-caller'
import { pendingRequestsData } from '../api-data/pending-requests.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = groupPendingRequests
const commit = jest.fn()

describe('mutations', () => {
  it('should RECEVIE_GROUP_PENDING_REQUESTS', () => {
    const payload = pendingRequestsData()
    mutations.RECEVIE_GROUP_PENDING_REQUESTS(state, payload)

    expect(state.pendingRequests).toEqual(payload)
  })
})

describe('actions', () => {
  describe('when getGroupPendingRequests', () => {
    it('should commit RECEVIE_GROUP_PENDING_REQUESTS', async () => {
      const response = { data: pendingRequestsData() }
      callApi.mockResolvedValue(response)
      await actions.getGroupPendingRequests({ commit })

      expect(commit).toHaveBeenCalledWith('RECEVIE_GROUP_PENDING_REQUESTS', response.data)
    })
  })
})
