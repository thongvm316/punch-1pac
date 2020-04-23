import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import Flash from '@/components/Flash'

const localWrapperOps = {
  ...wrapperOps,
  computed: {
    message: () => 'Success Message',
    type: () => 'success'
  }
}
const SET_FLASH_MESSAGE = jest.spyOn(Flash.methods, 'SET_FLASH_MESSAGE')

describe('Flash.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Flash, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Flash was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })

    it('should render error message', async () => {
      setComputed(wrapper, {
        message: 'Error Message', type: 'error'
      })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })
})
