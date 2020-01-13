import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import RemindPunchIn from '@/components/RemindPunchIn'

const close = jest.spyOn(RemindPunchIn.methods, 'close')

describe('RemindPunchIn.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when user remember to punch in all day', () => {
    beforeEach(() => {
      wrapper = shallowMount(RemindPunchIn, {
        ...wrapperOps,
        computed: {
          currentUser() {
            return { forgot_punch_in_days_in_month: [] }
          }
        }
      })

      it('should render correctly', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.isVueInstance()).toBeTruthy()
      })

      it('should not show the reminder toast', () => {
        expect(wrapper.isVisible()).toBeeFalsy()
      })
    })
  })

  describe('when user have forgot punch in some day', () => {
    beforeEach(() => {
      wrapper = shallowMount(RemindPunchIn, {
        ...wrapperOps,
        computed: {
          currentUser() {
            return { forgot_punch_in_days_in_month: ['2018-05-07', '2018-05-08', '2018-06-20'] }
          }
        },
        methods: {
          close
        }
      })
    })

    it('should show the remind punch in toast', () => {
      expect(wrapper.isVisible()).toBeTruthy()
    })

    it('should call close when click close button', async () => {
      wrapper.find({ ref: 'btnCloseToast' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(close).toHaveBeenCalled()
    })
  })
})
