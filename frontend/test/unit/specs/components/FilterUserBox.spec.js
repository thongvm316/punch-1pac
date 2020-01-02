import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'
import vSelect from 'vue-select'

import store from '@/store'
import i18n from '@/locale'
import FilterUserBox from '@/components/FilterUserBox'

const queryParams = {
  email: 'example@1pac.vn',
  name: 'Tuan',
  avatar_url: '/'
}

const search = jest.fn()

describe('FilterUserBox.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FilterUserBox, {
      i18n,
      store,
      localVue,
      propsData: {
        queryParams
      },
      methods: {
        search
      }
    })
  })

  afterEach(() => {
    wrapper.vm.$destroy()
  })

  describe('when FilterUserBox was mounted', () => {
    it('should display FilterUserBox component', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })

    it('should validate its props', () => {
      const { placeholder, queryParams, user } = wrapper.vm.$options.props

      expect(queryParams.required).toBeTruthy()
      expect(queryParams.type).toBe(Object)

      expect(placeholder.type).toBe(String)
      expect(user.type).toBe(Object)
    })

    it('should render sub components', () => {
      expect(wrapper.find(vSelect).exists()).toBe(true)
    })

    it('method search should been called', () => {
      expect(search).toHaveBeenCalled()
    })

    describe('when passing props user', () => {
      const user = {
        email: 'example@1pac.vn',
        name: 'Tuan',
        avatar_url: '/'
      }

      beforeEach(() => {
        wrapper.setProps({ user })
      })

      it('selectedUser should have user data from props', () => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.$data.selectedUser).toEqual(user)
        })
      })

      it('should emit update:user with user data', () => {
        wrapper.vm.$nextTick(() => {
          wrapper.vm.updateSelectedUser()
          expect(wrapper.emitted('update:user')).toBeTruthy()
          expect(wrapper.emitted('update:user')).toHaveLength(1)
          expect(wrapper.emitted('update:user')[0]).toEqual([user])
        })
      })
    })
  })
})
