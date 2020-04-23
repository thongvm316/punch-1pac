import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import PopupChangePassword from '@/components/PopupChangePassword'

const remind = jest.spyOn(PopupChangePassword.methods, 'remind')
const INITIAL_STATES_UPDATE_PASSWORD_CHANGED = jest.spyOn(PopupChangePassword.methods, 'INITIAL_STATES_UPDATE_PASSWORD_CHANGED')

const localWrapperOps = {
  ...wrapperOps,
  computed: {
    currentUser () {
      return {
        password_changed: false
      }
    }
  }
}

describe('PopupChangePassword.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PopupChangePassword, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when PopupChangePassword was mounted ', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when methods', () => {
    it('should remind toHaveBeenCalled', () => {
      wrapper.find({ ref: 'btnCloseModal' }).trigger('click')

      expect(remind).toHaveBeenCalled()
      expect(INITIAL_STATES_UPDATE_PASSWORD_CHANGED).toHaveBeenCalledWith(true)
    })
  })
})
