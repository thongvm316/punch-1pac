import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import store from '@/store'
import i18n from '@/locale'
import AnnualLeaveForm from '@/components/AnnualLeaveForm'
import flatPickr from 'vue-flatpickr-component'
import currentUser from '@/mixins/current-user'
import flatpickrLocale from '@/mixins/flatpickr-locale'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(currentUser)

const wrapper = shallowMount(AnnualLeaveForm, {
  i18n,
  store,
  localVue
})

describe('AnnualLeaveForm.vue', () => {
  describe('when AnnualLeaveForm was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })

    it('should render sub components', () => {
      expect(wrapper.find(flatPickr).exists()).toBe(true)
    })
  })

  describe('validation props data', () => {
    const { request, type, annualDay } = wrapper.vm.$options.props

    expect(request.required).toBeFalsy()
    expect(request.type).toBe(Object)
    expect(type.required).toBeFalsy()
    expect(type.type).toBe(String)
    expect(annualDay.required).toBeFalsy()
    expect(annualDay.type).toBe(String)
  })

  describe('when have errors', () => {
    it('should display error attendance_day', async () => {
      wrapper.setData({ errors: { attendance_day: ['something wrong'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper.findAll('.has-error')).toHaveLength(1)
      expect(wrapper.find('.has-error .form-input-hint').exists()).toBe(true)
      expect(wrapper.find('.has-error .form-input-hint').text()).toEqual('Day Off something wrong')
    })
  })
})
