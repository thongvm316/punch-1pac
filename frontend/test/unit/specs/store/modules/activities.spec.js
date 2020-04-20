import activities from '@/store/modules/activities'
import Repository from '@/repository'
import activitiesData from '../../../supports/fixtures/activities.api'
import metaData from '../../../supports/fixtures/meta.api'
jest.mock('@/repository/activities')

const activitiesRepository = Repository.get('activities')
const { state, mutations, actions } = activities
const commit = jest.fn()

describe('mutations', () => {
  const payload = {
    activities: [...activitiesData.activities],
    meta: metaData
  }

  describe('FETCH_ACTIVITIES', () => {
    it('should add activities & pager to state', () => {
      mutations.FETCH_ACTIVITIES(state, payload)

      expect(state.activities).toEqual(payload.activities)
      expect(state.pager).toEqual(payload.meta)
    })
  })

  describe('FETCH_MORE_ACTIVITIES', () => {
    it('should update activities & pager', () => {
      mutations.FETCH_MORE_ACTIVITIES(state, payload)

      expect(state.activities).toHaveLength(4)
      expect(state.pager).toEqual(payload.meta)
    })
  })
})

describe('actions', () => {
  const response = {
    data: {
      activities: [...activitiesData.activities],
      meta: metaData
    }
  }

  it('should getActivities called', async () => {
    activitiesRepository.getActivities.mockResolvedValue(response)
    await actions.getActivities({ commit }, {})
    expect(commit).toHaveBeenCalledWith('FETCH_ACTIVITIES', response.data)
  })

  it('should getMoreActivities called', async () => {
    activitiesRepository.getActivities.mockResolvedValue(response)
    await actions.getMoreActivities({ commit }, {})
    expect(commit).toHaveBeenCalledWith('FETCH_MORE_ACTIVITIES', response.data)
  })
})
