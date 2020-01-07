import activities from '@/store/modules/activities'
import callApi from '@/store/api-caller'
import { activitiesData, activitiesDataAddOn } from '../api-data/activities.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = activities

describe('mutations', () => {
  describe('FETCH_ACTIVITIES', () => {
    it('should add activities & pager to state', () => {
      const payload = activitiesData()
      mutations.FETCH_ACTIVITIES(state, payload)

      expect(state.activities).toEqual(payload.activities)
      expect(state.pager).toEqual(payload.meta)
    })
  })

  describe('FETCH_MORE_ACTIVITIES', () => {
    it('should update activities & pager', () => {
      const payload = activitiesDataAddOn()
      mutations.FETCH_MORE_ACTIVITIES(state, payload)

      expect(state.activities).toHaveLength(4)
      expect(state.pager).toEqual(payload.meta)
    })
  })
})

describe('actions', () => {
  let commit, response

  beforeEach(() => {
    commit = jest.fn()
    response = {
      data: activitiesData()
    }

    callApi.mockResolvedValue(response)
  })

  it('should getActivities called', async () => {
    await actions.getActivities({ commit }, {})
    expect(commit).toHaveBeenCalledWith('FETCH_ACTIVITIES', response.data)
  })

  it('should getMoreActivities called', async () => {
    await actions.getMoreActivities({ commit }, {})
    expect(commit).toHaveBeenCalledWith('FETCH_MORE_ACTIVITIES', response.data)
  })
})
