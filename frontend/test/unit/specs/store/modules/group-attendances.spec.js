import groupAttendances from '@/store/modules/group-attendances'
import Repositories from '@/repository'
import attendancesData from '../../../supports/fixtures/attendances.api'
jest.mock('@/repository/attendances')

const attendancesRepository = Repositories.get('attendances')
const { state, mutations, actions, getters } = groupAttendances
const commit = jest.fn()

describe('mutations', () => {
  it('should RECEIVE_GROUP_ATTENDANCES', () => {
    const payload = { ...attendancesData }
    mutations.RECEIVE_GROUP_ATTENDANCES(state, payload)

    expect(state.pager).toEqual(payload.meta)
    expect(state.attendances).toEqual(payload.attendances)
  })
})

describe('actions', () => {
  describe('when getAttendances', () => {
    it('should commit RECEIVE_GROUP_ATTENDANCES', async () => {
      const response = { data: { ...attendancesData } }
      attendancesRepository.getAttendances.mockResolvedValue(response)
      await actions.getAttendances({ commit }, {})

      expect(commit).toHaveBeenCalledWith('RECEIVE_GROUP_ATTENDANCES', response.data)
    })
  })
})

describe('getters', () => {
  describe('when filterAttendances', () => {
    let query, attendances
    beforeEach(() => { state.attendances = [...attendancesData.attendances] })

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
