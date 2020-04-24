import flash from '@/store/modules/flash'
import flashData from '../../../supports/fixtures/flash.api'

const { state, mutations } = flash

describe('mutations', () => {
  let payload

  it('should SET_FLASH_MESSAGE #success', () => {
    payload = flashData.success
    mutations.SET_FLASH_MESSAGE(state, payload)

    expect(state.message).toEqual('Congratulation!!!')
    expect(state.type).toEqual('success')
    expect(state.timeout).toEqual(5000)
  })

  it('should SET_FLASH_MESSAGE #error', () => {
    payload = flashData.error
    mutations.SET_FLASH_MESSAGE(state, payload)

    expect(state.message).toEqual('Error!!!')
    expect(state.type).toEqual('error')
    expect(state.timeout).toEqual(3000)
  })
})
