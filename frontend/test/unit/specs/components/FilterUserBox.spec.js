import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'
import vSelect from 'vue-select'

import store from '@/store'
import i18n from '@/locale'
import FilterUserBox from '@/components/FilterUserBox'

const search = jest.fn()

describe('FilterUserBox.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FilterUserBox, {
      i18n,
      store,
      localVue,
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

      expect(placeholder.required).toBeFalsy()
      expect(placeholder.type).toBe(String)

      expect(queryParams.required).toBeFalsy()
      expect(queryParams.type).toBe(Object)

      expect(user.required).toBeFalsy()
      expect(user.type).toBe(Object)
    })

    it('should render sub components', () => {
      expect(wrapper.find(vSelect).exists()).toBe(true)
    })

    it('method search should been called', () => {
      expect(search).toHaveBeenCalled()
    })

    it('selectedUser should have user data from props', () => {
      const testUser = {
        email: 'example@1pac.vn',
        name: 'Tuan',
        avatar_url: '/'
      }

      wrapper.setProps({ user: testUser })
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.$data.selectedUser).toEqual(testUser)
      })
    })
  })
})
