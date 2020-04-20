import punch from '@/store/modules/punch'
import Repositories from '@/repository'
import punchData from '../../../supports/fixtures/punch.api'
import error422 from '../../../supports/fixtures/errors.api'
jest.mock('@/repository/attendances')

const attendancesRepository = Repositories.get('attendances')
const { state, mutations, actions } = punch
const commit = jest.fn()

describe('mutations', () => {
  let payload

  it('should PUNCH_INIT_ATTENDANCE', () => {
    payload = { ...punchData }
    mutations.PUNCH_INIT_ATTENDANCE(state, payload)

    expect(state.attendance).toEqual(payload)
    expect(state.isInited).toBe(true)
  })

  it('should PUNCH_IN', () => {
    payload = Object.assign({ ...punchData }, {
      leaving_status: null,
      left_at: null
    })
    mutations.PUNCH_IN(state, payload)

    expect(state.attendance).toEqual(payload)
    expect(state.attendance.left_at).toBe(null)
  })

  it('should PUNCH_OUT', () => {
    payload = Object.assign({ ...punchData }, {
      leaving_status: 'leave_ok',
      left_at: '18:00'
    })
    mutations.PUNCH_OUT(state, payload)

    expect(state.attendance).toEqual(payload)
    expect(state.attendance.left_at).toBe('18:00')
    expect(state.attendance.leaving_status).toBe('leave_ok')
  })
})

describe('actions', () => {
  const response = { data: { ...punchData } }
  const userId = 1

  describe('when punchIn', () => {
    it('should commit PUNCH_IN', async () => {
      attendancesRepository.punchIn.mockResolvedValue(response)
      await actions.punchIn({ commit }, userId)

      expect(commit).toHaveBeenCalledWith('PUNCH_IN', response.data)
    })
  })

  describe('when punchOut', () => {
    it('should commit PUNCH_OUT', async () => {
      attendancesRepository.punchOut.mockResolvedValue(response)
      state.attendance = { ...punchData }
      await actions.punchOut({ commit, state }, userId)

      expect(commit).toHaveBeenCalledWith('PUNCH_OUT', response.data)
    })
  })
})
