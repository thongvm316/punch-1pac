import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import { fakeFebAttendances, fakeJanAttendances, fakeMarAttendances } from '../../supports/fixtures/calendar'
import moment from '@/moment'
import FullCalendar from '@/components/FullCalendar'

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

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when FullCalendar was mounted', () => {
    const localWrapperOps = {
      ...wrapperOps,
      data: function() {
        return {
          dateContext: moment('2019-02-05'),
          today: moment('2019-02-05')
        }
      },
      stubs: {
        CalendarDate: true,
        RequestForm: true,
        AnnualLeaveForm: true,
        PIcoPrevArrow: true,
        PIcoNextArrow: true,
        Modal: true
      },
      computed: {
        currentCompany() {
          return initialStatesData.currentCompany
        }
      },
      methods: {
        getCalendarAttendances
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(FullCalendar, localWrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(getCalendarAttendances).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when watch dateContext', () => {
    const localWrapperOps = {
      ...wrapperOps,
      data: function() {
        return {
          dateContext: moment('2019-01-01'),
          today: moment('2019-02-05')
        }
      },
      stubs: {
        CalendarDate: true,
        RequestForm: true,
        AnnualLeaveForm: true,
        PIcoPrevArrow: true,
        PIcoNextArrow: true,
        Modal: true
      },
      computed: {
        currentCompany() {
          return initialStatesData.currentCompany
        }
      },
      methods: {
        getCalendarAttendances
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(FullCalendar, localWrapperOps)
    })

    it('should render the other month', async () => {
      wrapper.setData({
        dateContext: moment('2019-01-01')
      })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when methods', () => {
    const localWrapperOps = {
      ...wrapperOps,
      data: function() {
        return {
          dateContext: moment('2019-02-05'),
          today: moment('2019-02-05')
        }
      },
      stubs: {
        CalendarDate: true,
        RequestForm: true,
        AnnualLeaveForm: true,
        PIcoPrevArrow: true,
        PIcoNextArrow: true,
        Modal: true
      },
      computed: {
        currentCompany() {
          return initialStatesData.currentCompany
        }
      },
      methods: {
        getCalendarAttendances
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(FullCalendar, localWrapperOps)
    })

    it('should toggleConfirmModal haveBeenCalled', async () => {
      wrapper.findAll({ ref: 'calendarDate' }).at(0).trigger('click')
      await wrapper.vm.$nextTick()

      expect(toggleConfirmModal).toHaveBeenCalledWith(wrapper.vm.attendances[0])
    })

    it('should lastMonth toHaveBeenCalled', async () => {
      wrapper.find({ ref: 'lastMonthBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(lastMonth).toHaveBeenCalled()
    })

    it('should nextMonth toHaveBeenCalled', async () => {
      wrapper.find({ ref: 'nextMonthBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(nextMonth).toHaveBeenCalled()
    })

    it('should currentMonth haveBeenCalled', async () => {
      wrapper.find({ ref: 'currentMonthBtn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(currentMonth).toHaveBeenCalled()
    })
  })
})
