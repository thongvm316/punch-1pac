import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import RemindPunchIn from '@/components/RemindPunchIn'

const close = jest.spyOn(RemindPunchIn.methods, 'close')
const UPDATE_REMIND_PUNCH_IN = jest.spyOn(RemindPunchIn.methods, 'UPDATE_REMIND_PUNCH_IN')

describe('RemindPunchIn.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when user remember to punch in all day', () => {
    const localWrapperOps = {
      ...wrapperOps,
      computed: {
        currentUser() {
          return { forgot_punch_in_days_in_month: [] }
        }
      }
    }
    beforeEach(() => {
      wrapper = shallowMount(RemindPunchIn, localWrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when user have forgot punch in some day', () => {
    const localWrapperOps = {
      ...wrapperOps,
      computed: {
        currentUser() {
          return { forgot_punch_in_days_in_month: ['2018-05-07', '2018-05-08', '2018-06-20'] }
        }
      }
    }
    beforeEach(() => {
      wrapper = shallowMount(RemindPunchIn, localWrapperOps)
    })

    it('should show the remind punch in toast', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call close when click close button', async () => {
      wrapper.find({ ref: 'btnCloseToast' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(close).toHaveBeenCalled()
      expect(UPDATE_REMIND_PUNCH_IN).toHaveBeenCalledWith(false)
    })
  })
})
