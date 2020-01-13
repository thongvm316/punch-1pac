import attendances from '@/store/modules/attendances'
import callApi from '@/store/api-caller'
import { attendancesData } from '../api-data/attendances.api.js'
import rootState from '../supports/root-state.js'
jest.mock('@/store/api-caller')

const { actions, mutations, state, getters } = attendances

describe('mutations', () => {
  it('RECEIVE_ATTENDANCES', () => {
    const payload = attendancesData()
    mutations.RECEIVE_ATTENDANCES(state, payload)

    expect(state.attendances).toEqual(payload.attendances)
    expect(state.forgotPunchInDays).toEqual(payload.meta.forgot_punch_in_days)
  })
})

describe('actions', () => {
  let commit

  beforeEach(() => { commit = jest.fn() })

  it('getAttendances', async () => {
    const response = {
      data: attendancesData()
    }

    callApi.mockResolvedValue(response)
    await actions.getAttendances({ commit, state }, {})

    expect(commit).toHaveBeenCalledWith('RECEIVE_ATTENDANCES', response.data)
  })
})

describe('getters', () => {
  describe('formattedAttendances', () => {
    let attendances

    beforeEach(() => {
      Object.assign(state, {
        attendances: attendancesData().attendances
      })
    })

    describe('when params null', () => {
      it('should return full attendances', () => {
        attendances = getters.formattedAttendances(state, getters, rootState)

        expect(attendances).toHaveLength(3)
        expect(attendances).toEqual(state.attendances)
      })
    })

    describe('when params status is not annual_leave', () => {
      it('should return full attendances', () => {
        Object.assign(state, {
          params: { status: 'day_off' }
        })
        attendances = getters.formattedAttendances(state, getters, rootState)

        expect(attendances).toHaveLength(3)
        expect(attendances).toEqual(state.attendances)
      })
    })
  })
})
