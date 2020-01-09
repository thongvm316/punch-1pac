import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import CompanySettingsProfile from '@/pages/CompanySettingsProfile'
import SettingLayout from '@/layouts/Setting'

const mockParamProps = {
  logo: '',
  namespace: 'namespace_1',
  name: 'April Simonis',
  country: 'French Guiana',
  industry: 'startup',
  address: '27755 Janis Village',
  phone_number: '1-469-970-9015',
  postal_code: '44596',
  tax_code: 'Ww534703Rg7f43',
  timezone: 'Asia/Bangkok',
  punch_method: 'default'
}
const currentCompany = {
  ...mockParamProps,
  id: 1,
  logo_url: '/static/logo.png',
  activated: true,
  breaktime: 1
}
const companyErrors = {
  name: 'name error',
  country: 'country error',
  address: 'address error',
  phone_number: 'phone error'
}

const clearCompanyErrors = jest.fn()
const handleSuccess = jest.fn()
const setLogoFile = jest.fn()
const updateCompany = jest.fn().mockResolvedValue('somthing doesnt matter')
const localUpdateCompany = jest.spyOn(CompanySettingsProfile.methods, 'localUpdateCompany')

describe('CompanySettingsProfile.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CompanySettingsProfile, {
      ...wrapperOps,
      methods: {
        setLogoFile,
        clearCompanyErrors,
        handleSuccess,
        updateCompany,
        localUpdateCompany
      },
      computed: {
        currentCompany() { return currentCompany }
      }
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when CompanySettingsHolidays mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render child components', () => {
      expect(wrapper.find(SettingLayout).exists()).toBeTruthy()
    })

    it('should call fetchHolidays', () => {
      expect(clearCompanyErrors).toHaveBeenCalled()
    })

    it('should update data params', () => {
      expect(wrapper.vm.params).toEqual(mockParamProps)
    })
  })

  describe('when change logo', () => {
    it('should call setLogoFile', async () => {
      wrapper.find('input[type=file]').trigger('change')
      await wrapper.vm.$nextTick()

      expect(setLogoFile).toHaveBeenCalled()
    })
  })

  describe('when click btnSave', () => {
    beforeEach(async () => {
      wrapper.find({ ref: 'btnSave' }).trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should call localUpdateCompany', () => {
      expect(localUpdateCompany).toHaveBeenCalled()
    })

    it('should call updateCompany with current data params', () => {
      expect(updateCompany).toHaveBeenCalledWith(mockParamProps)
      expect(handleSuccess).toHaveBeenCalled()
    })
  })

  describe('when have companyErrors', () => {
    it('should display error on related field', () => {
      wrapper = shallowMount(CompanySettingsProfile, {
        ...wrapperOps,
        computed: {
          companyErrors() { return companyErrors }
        }
      })

      expect(wrapper.findAll('.form-group.has-error').length).toBe(4)
      expect(wrapper.findAll('p.form-input-hint').length).toBe(4)
    })
  })
})
