import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import BusinessDayForm from '@/components/BusinessDayForm'

const localAddBusinessDay = jest.fn()
const localEditBusinessDay = jest.fn()

describe('BusinessDayForm.vue', () => {
  let wrapper

  afterEach(() => {
    wrapper.vm.$destroy()
  })

  describe('when BusinessDayForm was mounted', () => {
    beforeEach(() => {
      Object.assign(wrapperOps, { methods: { localAddBusinessDay } })
      wrapper = shallowMount(BusinessDayForm, wrapperOps)
    })

    it('should display AllowedIpForm Component', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })

    it('validation prop data', () => {
      const { targetBusinessDay } = wrapper.vm.$options.props
      expect(targetBusinessDay.required).toBeFalsy()
      expect(targetBusinessDay.type).toBe(Object)
    })

    it('should display create business day button', () => {
      expect(wrapper.find({ ref: 'createBusinessDayButton' }).exists()).toBe(true)
      expect(wrapper.find({ ref: 'editBusinessDayButton' }).exists()).toBe(false)
    })

    it('localAddBusinessDay method should have been call', async () => {
      wrapper.find({ ref: 'createBusinessDayButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localAddBusinessDay).toHaveBeenCalled()
    })

    it('should show error text', async () => {
      setComputed(wrapper, {
        errors: {
          weekday: ['can\'t be empty'],
          morning_started_at: ['can\'t be empty'],
          morning_ended_at: ['can\'t be empty'],
          afternoon_started_at: ['can\'t be empty'],
          afternoon_ended_at: ['can\'t be empty']
        }
      })
      await wrapper.vm.$nextTick()

      const formGroups = wrapper.findAll('.form-group')
      const formInputErrors = wrapper.findAll('.form-group > .form-input-hint')

      for (let i = 0; i < formInputErrors.length; i++) {
        expect(formGroups.at(i).classes()).toContain('has-error')
        expect(formGroups.at(i).find('.form-input-hint').exists()).toBe(true)
        expect(formGroups.at(i).find('.form-input-hint').text()).toContain('can\'t be empty')
      }
    })
  })

  describe('when BusinessDayForm was mounted with props', () => {
    beforeEach(() => {
      Object.assign(wrapperOps, {
        propsData: {
          targetBusinessDay: {
            weekday: 'monday',
            morning_started_at: '8:00',
            morning_ended_at: '8:00',
            afternoon_started_at: '8:00',
            afternoon_ended_at: '8:00'
          }
        },
        methods: {
          localEditBusinessDay
        }
      })
      wrapper = shallowMount(BusinessDayForm, wrapperOps)
    })

    it('should display update business day button', () => {
      expect(wrapper.find({ ref: 'createBusinessDayButton' }).exists()).toBe(false)
      expect(wrapper.find({ ref: 'editBusinessDayButton' }).exists()).toBe(true)
    })

    it('should update data from props targetBusinessDay', () => {
      const dataParams = wrapper.vm.$data.params
      const propsParams = wrapper.vm.$props.targetBusinessDay

      expect(propsParams.weekday).toBe(dataParams.weekday)
      expect(propsParams.morning_started_at).toBe(dataParams.morning_started_at)
      expect(propsParams.morning_ended_at).toBe(dataParams.morning_ended_at)
      expect(propsParams.afternoon_started_at).toBe(dataParams.afternoon_started_at)
      expect(propsParams.afternoon_ended_at).toBe(dataParams.afternoon_ended_at)
    })

    it('localEditBusinessDay method should have been call', async () => {
      wrapper.find({ ref: 'editBusinessDayButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localEditBusinessDay).toHaveBeenCalled()
    })
  })
})
