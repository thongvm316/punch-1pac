import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import moment from '@/moment'
import FullCalendar from '@/components/FullCalendar'
import CalendarDate from '@/components/CalendarDate'
import modal from '@/mixins/modal'
import { fakeJanAttendances, fakeFebAttendances, fakeMarAttendances } from '../../supports/api/calendar'

const fakeToday = '2019-02-05'

const nextMonth = jest.spyOn(FullCalendar.methods, 'nextMonth')
const lastMonth = jest.spyOn(FullCalendar.methods, 'lastMonth')
const currentMonth = jest.spyOn(FullCalendar.methods, 'currentMonth')
const toggleConfirmModal = jest.spyOn(FullCalendar.methods, 'toggleConfirmModal')

const getCalendarAttendances = jest.fn().mockImplementation(day => {
  if (moment(day).month() === 0) return Promise.resolve(fakeJanAttendances)
  if (moment(day).month() === 2) return Promise.resolve(fakeMarAttendances)
  else return Promise.resolve(fakeFebAttendances)
})

describe('FullCalendar.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = shallowMount(FullCalendar, Object.assign(wrapperOps, {
      methods: {
        getCalendarAttendances,
        nextMonth,
        lastMonth,
        currentMonth,
        toggleConfirmModal
      },
      mixins: [modal]
    }))

    wrapper.setData({
      dateContext: moment(fakeToday),
      today: moment(fakeToday)
    })
    await wrapper.vm.$nextTick()
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when FullCalendar was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.vm.attendances).toHaveLength(28)
    })

    it('should open modal Edit Attendance when click on day 1', async () => {
      wrapper.findAll(CalendarDate).at(0).trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find({ ref: 'editModal' }).isVisible()).toBeTruthy()
    })

    it('should open modal Request when click on day 4', async () => {
      wrapper.findAll(CalendarDate).at(3).trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find({ ref: 'requestModal' }).isVisible()).toBeTruthy()
    })

    it('should open modal Add Attendance when click on day 11', async () => {
      wrapper.findAll(CalendarDate).at(10).trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find({ ref: 'addModal' }).isVisible()).toBeTruthy()
    })

    it('should update data attendances when click btn Last Month', async () => {
      wrapper.find({ ref: 'lastMonthBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(lastMonth).toHaveBeenCalled()
      expect(wrapper.vm.attendances).toHaveLength(31)
    })

    describe('when click btn Next Month', () => {
      beforeEach(async () => {
        wrapper.find({ ref: 'nextMonthBtn' }).trigger('click')
        await wrapper.vm.$nextTick()
      })

      it('should update attendances of next month', () => {
        expect(nextMonth).toHaveBeenCalled()
        expect(wrapper.vm.attendances).toHaveLength(31)
      })

      it('should update attendances of this month when click Today', async () => {
        wrapper.find({ ref: 'currentMonthBtn' }).trigger('click')
        await wrapper.vm.$nextTick()

        expect(currentMonth).toHaveBeenCalled()
        expect(wrapper.vm.attendances).toHaveLength(28)
      })
    })
  })
})
