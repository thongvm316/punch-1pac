import groupAttendances from '@/store/modules/group-attendances'
import callApi from '@/store/api-caller'
import { groupAttendancesData } from '../api-data/group-attendances.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions, getters } = groupAttendances
const commit = jest.fn()

describe('mutations', () => {
  it('should RECEIVE_GROUP_ATTENDANCES', () => {
    const payload = groupAttendancesData()
    mutations.RECEIVE_GROUP_ATTENDANCES(state, payload)

    expect(state.pager).toEqual(payload.meta)
    expect(state.attendances).toEqual(payload.attendances)
  })
})

describe('actions', () => {
  describe('when getAttendances', () => {
    it('should commit RECEIVE_GROUP_ATTENDANCES', async () => {
      const response = { data: groupAttendancesData() }
      callApi.mockResolvedValue(response)
      await actions.getAttendances({ commit }, {})

      expect(commit).toHaveBeenCalledWith('RECEIVE_GROUP_ATTENDANCES', response.data)
    })
  })
})

describe('getters', () => {
  describe('when filterAttendances', () => {
    let query, attendances
    beforeEach(() => { state.attendances = groupAttendancesData().attendances })

    it('should return 0 attendances', () => {
      query = 'www'
      attendances = getters.filterAttendances(state)(query)

      expect(attendances).toHaveLength(0)
    })

    it('should return match attendances', () => {
      query = 'clara'
      attendances = getters.filterAttendances(state)(query)

      expect(attendances).toHaveLength(2)
    })

    it('should return match attendances', () => {
      query = ''
      attendances = getters.filterAttendances(state)(query)

      expect(attendances).toHaveLength(3)
    })
  })
})
