import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import handleSuccess from '@/mixins/handle-success'
import UserProfile from '@/components/UserProfile'

const targetUser = {
  avatar: '/static/avatar.png',
  gender: 'male',
  name: 'Clara Mayer',
  position: 'Backend Developer',
  email: 'example@1pac.vn',
  role: 'superamin'
}
const updateUser = jest.fn()
const setAvatarFile = jest.fn()

Object.assign(wrapperOps, {
  propsData: { targetUser },
  mixins: [handleSuccess],
  methods: {
    updateUser,
    setAvatarFile
  }
})

describe('UserProfile.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserProfile, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have params data', () => {
    expect(wrapper.vm.params).toEqual(targetUser)
  })

  it('should setAvatarFile method was called', () => {
    wrapper.find('input[type=file]').trigger('change')

    expect(setAvatarFile).toHaveBeenCalled()
  })

  it('should updateUser method was called', () => {
    wrapper.find('button').trigger('click')
    expect(updateUser).toHaveBeenCalled()
  })
})
