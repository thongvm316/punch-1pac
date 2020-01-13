import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import SettingLayout from '@/layouts/Setting'
import GroupSelect from '@/components/GroupSelect.vue'
import CompanySettingsUsersAdd from '@/pages/CompanySettingsUsersAdd'

const params = {
  name: 'dummyName',
  email: 'dummyMail@gmail.com',
  role: 'member',
  group_id: '1'
}
const errors = {
  ...params,
  group: 'group error'
}
const create = jest.fn()

describe('CompanySettingsUsersAdd.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsUsersAdd, {
      ...wrapperOps,
      methods: {
        create
      },
      data: function() {
        return {
          params,
          errors
        }
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsUsersAdd mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
      expect(wrapper.find(GroupSelect).exists()).toBeTruthy()
    })

    it('should display 4 error', () => {
      expect(wrapper.findAll('.has-error').length).toBe(4)
      expect(wrapper.findAll('.form-input-hint').length).toBe(4)
    })
  })

  describe('when click btn Submit', () => {
    it('should call create with right argument', async () => {
      wrapper.find('button[type=button]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(create).toHaveBeenCalledWith(params)
    })
  })
})
