import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import error422 from '../../supports/fixtures/errors.api'
import setComputed from '../../supports/set-computed'
import Repositories from '@/repository'
import UserProfile from '@/components/UserProfile'
jest.mock('@/repository/users')

const targetUser = { ...initialStatesData.currentUser }
const updateUser = jest.spyOn(UserProfile.methods, 'updateUser')
const setAvatarFile = jest.fn()
const handleSuccess = jest.spyOn(UserProfile.mixins[0].methods, 'handleSuccess')
const INITIAL_STATES_UPDATE_USER = jest.spyOn(UserProfile.methods, 'INITIAL_STATES_UPDATE_USER')
const UPDATE_GROUP_USER = jest.spyOn(UserProfile.methods, 'UPDATE_GROUP_USER')
const UPDATE_USER = jest.spyOn(UserProfile.methods, 'UPDATE_USER')

const localWrapperOps = {
  ...wrapperOps,
  methods: {
    setAvatarFile
  },
  propsData: {
    targetUser
  },
  computed: {
    isDisabled() {
      return false
    },
    meta() {
      return initialStatesData.meta
    },
    currentUser() {
      return { ...initialStatesData.currentUser }
    }
  }
}

describe('UserProfile.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserProfile, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when UserProfile was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when methods', () => {
    describe('when setAvatarFile', () => {
      it('should setAvatarFile toHaveBeenCalled', () => {
        wrapper.find('input[type=file]').trigger('change')

        expect(setAvatarFile).toHaveBeenCalled()
      })
    })

    describe('when updateUser', () => {
      const response = { data: initialStatesData.currentUser }
      const mockError = error422

      describe('when targetUser === currentUser', () => {
        it('should INITIAL_STATES_UPDATE_USER', async () => {
          Repositories.get('users').updateUser.mockResolvedValue(response)
          wrapper.find({ ref: 'updateUserButton' }).trigger('click')
          await wrapper.vm.$nextTick()

          expect(updateUser).toHaveBeenCalled()
          expect(INITIAL_STATES_UPDATE_USER).toHaveBeenCalledWith(response.data)
          expect(handleSuccess).toHaveBeenCalledWith({
            emitType: 'afterUserProfileUpdated',
            message: 'Your profile is updated'
          })
          expect(wrapper.vm.errors).toEqual({})
        })

        it('should rejectedError', async () => {
          Repositories.get('users').updateUser.mockRejectedValue(mockError)
          wrapper.find({ ref: 'updateUserButton' }).trigger('click')
          await wrapper.vm.$nextTick()

          expect(updateUser).toHaveBeenCalled()
          expect(wrapper.vm.errors).toEqual(mockError.response.data.errors)
        })
      })

      describe('when objectType === company', () => {
        it('should UPDATE_USER', async () => {
          wrapper.setProps({
            objectType: 'company'
          })
          await wrapper.vm.$nextTick()

          Repositories.get('users').updateUser.mockResolvedValue(response)
          wrapper.find({ ref: 'updateUserButton' }).trigger('click')
          await wrapper.vm.$nextTick()

          expect(UPDATE_USER).toHaveBeenCalledWith(response.data)
        })
      })

      describe('when objectType === group', () => {
        it('should UPDATE_USER', async () => {
          wrapper.setProps({
            objectType: 'group'
          })
          await wrapper.vm.$nextTick()

          Repositories.get('users').updateUser.mockResolvedValue(response)
          wrapper.find({ ref: 'updateUserButton' }).trigger('click')
          await wrapper.vm.$nextTick()

          expect(UPDATE_GROUP_USER).toHaveBeenCalledWith(response.data)
        })
      })
    })
  })
})
