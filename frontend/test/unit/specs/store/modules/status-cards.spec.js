import statusCards from '@/store/modules/status-cards'
import callApi from '@/store/api-caller'
import { statusCardsData } from '../api-data/status-cards.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = statusCards
const commit = jest.fn()

describe('mutations', () => {
  it('should FETCH_STATUS_CARDS', () => {
    const payload = statusCardsData()
    mutations.FETCH_STATUS_CARDS(state, payload)

    expect(state.statuses).toEqual(payload.statuses)
    expect(state.meta).toEqual(payload.meta)
  })
})

describe('actions', () => {
  describe('when getStatuses', () => {
    it('should commit FETCH_STATUS_CARDS', async () => {
      const response = { data: statusCardsData() }
      callApi.mockResolvedValue(response)
      await actions.getStatuses({ commit }, '2019-01-01')

      expect(commit).toHaveBeenCalledWith('FETCH_STATUS_CARDS', response.data)
    })
  })
})
