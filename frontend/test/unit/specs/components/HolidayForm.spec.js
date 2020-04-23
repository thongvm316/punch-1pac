import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import holidaysData from '../../supports/fixtures/holidays.api'
import HolidayForm from '@/components/HolidayForm'

const localAddHoliday = jest.spyOn(HolidayForm.methods, 'localAddHoliday')
const localEditHoliday = jest.spyOn(HolidayForm.methods, 'localEditHoliday')
const CLEAR_HOLIDAY_ERRORS = jest.spyOn(HolidayForm.methods, 'CLEAR_HOLIDAY_ERRORS')
const createHoliday = jest.spyOn(HolidayForm.methods, 'createHoliday').mockResolvedValue(null)
const updateHoliday = jest.spyOn(HolidayForm.methods, 'updateHoliday').mockResolvedValue(null)
const handleSuccess = jest.spyOn(HolidayForm.mixins[1].methods, 'handleSuccess')

const targetHoliday = [...holidaysData.holidays][0]

const localWrapperOps = {
  ...wrapperOps,
  stubs: {
    flatPickr: true
  },
  computed: {
    isDisabled: () => false,
    pickLocale: () => 'en'
  }
}

describe('HolidayForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(HolidayForm, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when have no props', () => {
    describe('when HolidayForm was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when localAddHoliday', () => {
      it('should localAddHoliday hasBeenCalled', async () => {
        wrapper.find({ ref: 'localAddHolidayBtn' }).trigger('click')
        await wrapper.vm.$nextTick()

        expect(localAddHoliday).toHaveBeenCalled()
        expect(createHoliday).toHaveBeenCalledWith(wrapper.vm.params)
        expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Holiday is created' })
      })
    })
  })

  describe('when have props', () => {
    beforeEach(async () => {
      wrapper.setProps({
        targetHoliday
      })
      await wrapper.vm.$nextTick()
    })

    describe('when HolidayForm was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when localEditHoliday', () => {
      it('should localEditHoliday haveBeenCalled', async () => {
        wrapper.find({ ref: 'localEditHolidayBtn' }).trigger('click')
        await wrapper.vm.$nextTick()

        expect(localEditHoliday).toHaveBeenCalled()
        expect(updateHoliday).toHaveBeenCalledWith({
          holidayID: targetHoliday.id,
          updateParams: wrapper.vm.params
        })
        expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Holiday is updated' })
      })
    })
  })

  describe('when errors', () => {
    it('should have text error', () => {
      const errors = {
        name: ['has been taken'],
        started_at: ['wrong'],
        ended_at: ['wrong']
      }
      setComputed(wrapper, { errors })

      expect(wrapper).toMatchSnapshot()
    })
  })
})
