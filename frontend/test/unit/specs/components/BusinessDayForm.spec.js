import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import initStatesData from '../../supports/fixtures/initial-states.api'
import businessDaysData from '../../supports/fixtures/business-days.api'
import BusinessDayForm from '@/components/BusinessDayForm'

const localAddBusinessDay = jest.spyOn(BusinessDayForm.methods, 'localAddBusinessDay')
const localEditBusinessDay = jest.spyOn(BusinessDayForm.methods, 'localEditBusinessDay')
const addBusinessDay = jest.spyOn(BusinessDayForm.methods, 'addBusinessDay').mockResolvedValue(null)
const updateBusinessDay = jest.spyOn(BusinessDayForm.methods, 'updateBusinessDay').mockResolvedValue(null)
const handleSuccess = jest.spyOn(BusinessDayForm.mixins[0].methods, 'handleSuccess')

describe('BusinessDayForm.vue', () => {
  describe('when have no props', () => {
    const newWrapperOps = {
      ...wrapperOps,
      stubs: { flatPickr: true }
    }

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(BusinessDayForm, newWrapperOps)

      setComputed(wrapper, {
        isDisabled: false,
        meta: initStatesData.meta,
        errors: {}
      })
    })

    afterEach(() => {
      wrapper.vm.$destroy()
    })

    describe('when render correctly', () => {
      it('should display AllowedIpForm Component', () => {
        expect(wrapper.isVueInstance()).toBe(true)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper).toMatchSnapshot()
      })

      it('should show error text', async () => {
        setComputed(wrapper, {
          errors: businessDaysData.errors
        })
        await wrapper.vm.$nextTick()

        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when localAddBusinessDay ', () => {
      it('should localAddBusinessDay have been called', async () => {
        wrapper.find({ ref: 'createBusinessDayButton' }).trigger('click')
        await wrapper.vm.$nextTick()

        expect(localAddBusinessDay).toHaveBeenCalled()
        expect(addBusinessDay).toHaveBeenCalledWith(wrapper.vm.params)
        expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Business day is created' })
      })
    })
  })

  describe('when props targetBusinessDay', () => {
    const newWrapperOps = {
      ...wrapperOps,
      stubs: { flatPickr: true },
      propsData: {
        targetBusinessDay: {
          id: 0,
          weekday: 'monday',
          morning_started_at: '8:00',
          morning_ended_at: '12:00',
          afternoon_started_at: '13:00',
          afternoon_ended_at: '17:00'
        }
      }
    }

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(BusinessDayForm, newWrapperOps)

      setComputed(wrapper, {
        isDisabled: false,
        meta: initStatesData.meta,
        errors: {}
      })
    })

    describe('when was mouted', () => {
      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when localEditBusinessDay', () => {
      it('should localEditBusinessDay has been called', async () => {
        wrapper.find({ ref: 'editBusinessDayButton' }).trigger('click')
        await wrapper.vm.$nextTick()

        expect(localEditBusinessDay).toHaveBeenCalled()
        expect(updateBusinessDay).toHaveBeenCalledWith({ businessDayId: 0, updateParams: wrapper.vm.params })
        expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Business day is updated' })
      })
    })
  })
})
