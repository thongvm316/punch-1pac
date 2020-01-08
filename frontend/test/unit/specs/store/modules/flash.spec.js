import flash from '@/store/modules/flash'
import { flashData } from '../api-data/flash.api.js'

const { state, mutations, actions } = flash
const commit = jest.fn()

describe('mutations', () => {
  let payload

  it('should SET_FLASH_MESSAGE #success', () => {
    payload = flashData().success
    mutations.SET_FLASH_MESSAGE(state, payload)

    expect(state.message).toEqual('Congratulation!!!')
    expect(state.type).toEqual('success')
    expect(state.timeout).toEqual(5000)
  })

  it('should SET_FLASH_MESSAGE #error', () => {
    payload = flashData().error
    mutations.SET_FLASH_MESSAGE(state, payload)

    expect(state.message).toEqual('Error!!!')
    expect(state.type).toEqual('error')
    expect(state.timeout).toEqual(3000)
  })
})

describe('actions', () => {
  it('should commit SET_FLASH_MESSAGE', () => {
    const flash = flashData().error
    actions.setFlashMsg({ commit }, flash)

    expect(commit).toHaveBeenCalledWith('SET_FLASH_MESSAGE', flash)
  })
})
