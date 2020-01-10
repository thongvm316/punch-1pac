import punch from '@/store/modules/punch'
import callApi from '@/store/api-caller'
import { attendanceData } from '../api-data/punch.api.js'
import { error422 } from '../api-data/promises-error.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = punch
const commit = jest.fn()

describe('mutations', () => {
  let payload

  it('should PUNCH_INIT_ATTENDANCE', () => {
    payload = attendanceData()
    mutations.PUNCH_INIT_ATTENDANCE(state, payload)

    expect(state.attendance).toEqual(payload)
    expect(state.isInited).toBe(true)
  })

  it('should PUNCH_IN', () => {
    payload = Object.assign(attendanceData(), {
      leaving_status: null,
      left_at: null
    })
    mutations.PUNCH_IN(state, payload)

    expect(state.attendance).toEqual(payload)
    expect(state.attendance.left_at).toBe(null)
  })

  it('should PUNCH_OUT', () => {
    payload = Object.assign(attendanceData(), {
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
  let response
  const userId = 1

  describe('when punchIn', () => {
    it('should commit PUNCH_IN', async () => {
      response = { data: attendanceData() }
      callApi.mockResolvedValue(response)
      await actions.punchIn({ commit }, userId)

      expect(commit).toHaveBeenCalledWith('PUNCH_IN', response.data)
    })
  })

  describe('when punchOut', () => {
    it('should commit PUNCH_OUT', async () => {
      response = { data: attendanceData() }
      callApi.mockResolvedValue(response)
      state.attendance = attendanceData()
      await actions.punchOut({ commit, state }, userId)

      expect(commit).toHaveBeenCalledWith('PUNCH_OUT', response.data)
    })
  })
})
