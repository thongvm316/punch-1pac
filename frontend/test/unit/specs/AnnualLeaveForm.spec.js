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

  describe('when wrapper have no error', () => {
    it('should error no display', () => {
      expect(wrapper.find('.form-group.has-error').exists()).toBe(false)
      expect(wrapper.find('.form-group .form-input-hint').exists()).toBe(false)
    })
  })

  describe('when wrapper have error', () => {
    let newWrapper

    beforeEach(() => {
      newWrapper = shallowMount(AnnualLeaveForm, {
        i18n,
        store,
        localVue
      })
    })

    it('should display error attendance_day', async () => {
      newWrapper.setData({ errors: { attendance_day: ['something wrong'] } })
      await newWrapper.vm.$nextTick()

      expect(newWrapper.findAll('.has-error')).toHaveLength(1)
      expect(newWrapper.find('.has-error .form-input-hint').exists()).toBe(true)
      expect(newWrapper.find('.has-error .form-input-hint').text()).toEqual('Day Off something wrong')
    })

    it('should display error reason', async () => {
      newWrapper.setData({ errors: { reason: ['error'] } })
      await newWrapper.vm.$nextTick()

      expect(newWrapper.findAll('.has-error')).toHaveLength(1)
      expect(newWrapper.find('.has-error .form-input-hint').exists()).toBe(true)
      expect(newWrapper.find('.has-error .form-input-hint').text()).toEqual('Reason error')
    })

    it('should display both errors', async () => {
      newWrapper.setData({ errors: { attendance_day: ['attendance_day error'], reason: ['reason error'] } })
      await newWrapper.vm.$nextTick()

      expect(newWrapper.findAll('.has-error')).toHaveLength(2)
      expect(newWrapper.find('.has-error .form-input-hint').exists()).toBe(true)
    })
  })

  describe('when wrapper have no request', () => {
    it('should render create button', () => {
      expect(wrapper.findAll('.form-group button')).toHaveLength(1)
      expect(wrapper.find({ ref: 'createAnnualLeaveBtn' }).exists()).toBe(true)
      expect(wrapper.find({ ref: 'updateAnnualLeaveBtn' }).exists()).toBe(false)
    })

    it('should call create method', () => {
      const create = jest.fn()
      const update = jest.fn()
      wrapper.setMethods({ create, update })
      wrapper.find({ ref: 'createAnnualLeaveBtn' }).trigger('click')

      expect(create).toHaveBeenCalled()
      expect(update).not.toHaveBeenCalled()
    })
  })

  describe('when wrapper have request', () => {
    let newWrapper

    beforeEach(() => {
      newWrapper = shallowMount(AnnualLeaveForm, {
        i18n,
        store,
        localVue
      })
      newWrapper.setProps({ request: { id: 0, reason: 'personal issue' } })
    })

    it('should render update button', () => {
      expect(newWrapper.findAll('.form-group button')).toHaveLength(1)
      expect(newWrapper.find({ ref: 'createAnnualLeaveBtn' }).exists()).toBe(false)
      expect(newWrapper.find({ ref: 'updateAnnualLeaveBtn' }).exists()).toBe(true)
    })

    it('should call create method', () => {
      const create = jest.fn()
      const update = jest.fn()
      newWrapper.setMethods({ update, create })
      newWrapper.find({ ref: 'updateAnnualLeaveBtn' }).trigger('click')

      expect(update).toHaveBeenCalled()
      expect(create).not.toHaveBeenCalled()
    })
  })
})
