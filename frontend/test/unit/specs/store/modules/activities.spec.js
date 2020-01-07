import activities from '@/store/modules/activities'
import callApi from '@/store/api-caller'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = activities

describe('mutations', () => {
  describe('FETCH_ACTIVITIES', () => {
    it('should add activities & pager to state', () => {
      const payload = {
        activities: [
          {
            id: 0,
            activitable_id: 0,
            activitable_type: 'Request',
            kind: 'create',
            created_at: '2019-01-01'
          },
          {
            id: 1,
            activitable_id: 0,
            activitable_type: 'Punch',
            kind: 'update',
            created_at: '2019-01-02'
          }
        ],
        meta: { current_page: 1,
          next_page: 2,
          per_page: 10,
          total_pages: 10
        }
      }

      mutations.FETCH_ACTIVITIES(state, payload)
      expect(state.activities).toEqual(payload.activities)
      expect(state.pager).toEqual(payload.meta)
    })
  })

  describe('FETCH_MORE_ACTIVITIES', () => {
    it('should update activities & pager', () => {
      const payload = {
        activities: [
          {
            id: 2,
            activitable_id: 0,
            activitable_type: 'Punch',
            kind: 'create',
            created_at: '2019-01-03'
          },
          {
            id: 3,
            activitable_id: 0,
            activitable_type: 'Punch',
            kind: 'create',
            created_at: '2019-01-04'
          }
        ],
        meta: {
          current_page: 2,
          next_page: 3,
          previous_page: 1,
          per_page: 10,
          total_pages: 10
        }
      }

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
      data: {
        activities: [
          {
            id: 2,
            activitable_id: 0,
            activitable_type: 'Punch',
            kind: 'create',
            created_at: '2019-01-03'
          },
          {
            id: 3,
            activitable_id: 0,
            activitable_type: 'Punch',
            kind: 'create',
            created_at: '2019-01-04'
          }
        ],
        meta: {
          current_page: 2,
          next_page: 3,
          previous_page: 1,
          per_page: 10,
          total_pages: 10
        }
      }
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
