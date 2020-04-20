import remindPunchIn from '@/store/modules/remind-punch-in'

const { state, mutations } = remindPunchIn

describe('mutations', () => {
  it('UPDATE_REMIND_PUNCH_IN', () => {
    state.open = true
    const value = false

    mutations.UPDATE_REMIND_PUNCH_IN(state, value)

    expect(state.open).toEqual(value)
  })
})
