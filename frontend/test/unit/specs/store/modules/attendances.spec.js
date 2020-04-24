import attendances from '@/store/modules/attendances'
import Repository from '@/repository'
import attendancesData from '../../../supports/fixtures/attendances.api'
import rootState from '../../../supports/root-state'
jest.mock('@/repository/attendances')

const attendancesRepository = Repository.get('attendances')
const { actions, mutations, state, getters } = attendances
const commit = jest.fn()

describe('mutations', () => {
  it('RECEIVE_ATTENDANCES', () => {
    const payload = {
      attendances: [...attendancesData.attendances],
      meta: attendancesData.meta
    }
    mutations.RECEIVE_ATTENDANCES(state, payload)

    expect(state.attendances).toEqual(payload.attendances)
    expect(state.forgotPunchInDays).toEqual(payload.meta.forgot_punch_in_days)
  })
})

describe('actions', () => {
  it('getAttendances', async () => {
    const response = {
      data: {
        attendances: [...attendancesData.attendances],
        meta: attendancesData.meta
      }
    }

    attendancesRepository.getAttendances.mockResolvedValue(response)
    await actions.getAttendances({ commit, state }, {})

    expect(commit).toHaveBeenCalledWith('RECEIVE_ATTENDANCES', response.data)
  })
})

describe('getters', () => {
  describe('formattedAttendances', () => {
    let attendances

    beforeEach(() => {
      Object.assign(state, {
        attendances: [...attendancesData.attendances]
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
