import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import SettingLayout from '@/layouts/Setting'
import CompanySettingsUsersAddMulti from '@/pages/CompanySettingsUsersAddMulti'

const errors = {
  csv_file: 'dummy',
  lines: ['dummy', 'dummy']
}
const params = {
  csv_file: new File(['test'], 'test.txt')
}

const setCsvFile = jest.fn()
const upload = jest.fn()

describe('CompanySettingsUsersAddMulti.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsUsersAddMulti, {
      ...wrapperOps,
      data: function() {
        return {
          errors,
          params
        }
      },
      methods: {
        setCsvFile,
        upload
      }
    })
  })
  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsUsersAddMulti mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
    })

    it('should display form group has error', () => {
      expect(wrapper.findAll('.form-group.has-error').length).toBe(1)
    })

    it('should display 2 line of error', () => {
      expect(wrapper.findAll('.form-input-hint').length).toBe(2)
    })
  })

  describe('when click choose file', () => {
    it('should call setCsvFile', async () => {
      wrapper.find('input[type=file]').trigger('change')
      await wrapper.vm.$nextTick()

      expect(setCsvFile).toHaveBeenCalled()
    })
  })

  describe('when click btn Submit', () => {
    it('should call upload with right argument', async () => {
      wrapper.find('button[type=button]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(upload).toHaveBeenCalledWith(params)
    })
  })
})
