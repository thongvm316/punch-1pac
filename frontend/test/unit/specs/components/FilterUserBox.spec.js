import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import usersData from '../../supports/fixtures/users.api'
import Repositories from '@/repository'
import FilterUserBox from '@/components/FilterUserBox'
jest.mock('@/repository/users')

const propsData = {
  queryParams: [...usersData.users][0],
  placeholder: 'Search box'
}
const optionsUsers = [...usersData.users]
const search = jest.spyOn(FilterUserBox.methods, 'search')
const filterUsers = jest.spyOn(FilterUserBox.methods, 'filterUsers')
const updateSelectedUser = jest.spyOn(FilterUserBox.methods, 'updateSelectedUser')

const localWrapperOps = {
  ...wrapperOps,
  propsData,
  stubs: {
    vSelect: true
  },
  data() {
    return {
      optionsUsers
    }
  }
}

describe('FilterUserBox.vue', () => {
  let wrapper
  const response = { data: { users: [...usersData.users] } }
  Repositories.get('users').getUsers.mockResolvedValue(response)

  beforeEach(() => {
    wrapper = shallowMount(FilterUserBox, localWrapperOps)
  })

  afterEach(() => {
    wrapper.vm.$destroy()
  })

  describe('when FilterUserBox was mounted', () => {
    describe('when rendered', () => {
      it('should display FilterUserBox component', () => {
        expect(wrapper.isVueInstance()).toBe(true)
        expect(wrapper.exists()).toBe(true)
        expect(search).toHaveBeenCalledWith('', false)
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when props user', () => {
      const user = [...usersData.users][0]

      beforeEach(() => {
        wrapper.setProps({ user })
      })

      it('should selectedUser data', () => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.$data.selectedUser).toEqual(user)
        })
      })

      it('should emit update:user with user data', async () => {
        wrapper.vm.updateSelectedUser()
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('update:user')).toBeTruthy()
        expect(wrapper.emitted('update:user')).toHaveLength(1)
        expect(wrapper.emitted('update:user')[0]).toEqual([user])
      })
    })
  })
})
