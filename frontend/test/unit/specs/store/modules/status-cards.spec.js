import statusCards from '@/store/modules/status-cards'
import Repositories from '@/repository'
import statusCardsData from '../../../supports/fixtures/status-cards.api'
jest.mock('@/repository/attendances')

const attendancesRepository = Repositories.get('attendances')
const { state, mutations, actions } = statusCards
const commit = jest.fn()

describe('mutations', () => {
  it('should FETCH_STATUS_CARDS', () => {
    const payload = { ...statusCardsData }
    mutations.FETCH_STATUS_CARDS(state, payload)

    expect(state.statuses).toEqual(payload.statuses)
    expect(state.meta).toEqual(payload.meta)
  })
})

describe('actions', () => {
  describe('when getStatuses', () => {
    it('should commit FETCH_STATUS_CARDS', async () => {
      const response = { data: { ...statusCardsData } }
      attendancesRepository.getStatuses.mockResolvedValue(response)
      await actions.getStatuses({ commit }, '2019-01-01')

      expect(commit).toHaveBeenCalledWith('FETCH_STATUS_CARDS', response.data)
    })
  })
})
