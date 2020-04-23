import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import usersData from '../../supports/fixtures/users.api'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import UserAddForm from '@/components/UserAddForm'

const create = jest.spyOn(UserAddForm.methods, 'create')
const createUser = jest.spyOn(UserAddForm.methods, 'createUser').mockResolvedValue(null)
const handleSuccess = jest.spyOn(UserAddForm.mixins[0].methods, 'handleSuccess')
const CLEAR_USER_ERRORS = jest.spyOn(UserAddForm.methods, 'CLEAR_USER_ERRORS')

const localWrapperOps = {
  ...wrapperOps,
  stubs: {
    GroupSelect: true
  },
  computed: {
    isDisabled() {
      return false
    },
    meta() {
      return initialStatesData.meta
    }
  }
}

describe('UserAddForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserAddForm, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when UserAddForm was mouted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(CLEAR_USER_ERRORS).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when errors', () => {
    it('should match snapshot', async () => {
      setComputed(wrapper, {
        errors: usersData.errors
      })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when create toHaveBeenCalled', () => {
    it('should create method called', async () => {
      wrapper.find('.btn.btn-success.btn-submit').trigger('click')
      await wrapper.vm.$nextTick()

      expect(create).toHaveBeenCalled()
      expect(createUser).toHaveBeenCalledWith(wrapper.vm.params)
      expect(handleSuccess).toHaveBeenCalledWith({
        message: 'An user is created. Email contains login information is sent to user',
        emitType: 'afterAdded'
      })
    })
  })
})
