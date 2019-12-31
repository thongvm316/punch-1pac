import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'

import store from '@/store'
import i18n from '@/locale'
import CalendarDate from '@/components/CalendarDate'

const propsData = {
  normalDay: {
    calendarAttendance: {
      attended_at: '08:13',
      attending_status: 'attend_ok',
      day: localVue.prototype.$moment().format('YYYY-MM-DD'),
      leaving_status: 'leave_early',
      left_at: '08:13'
    },

    today: localVue.prototype.$moment()
  },

  offDay: {
    calendarAttendance: {
      day: '2019-12-03',
      off_status: 'annual_leave'
    },

    today: localVue.prototype.$moment()
  },

  weekendDay: {
    calendarAttendance: {
      day: '2019-12-08',
    },

    today: localVue.prototype.$moment()
  },

  specialDay: {
    calendarAttendance: {
      day: '2019-12-13',
      holiday: {
        name: 'Tet holiday'
      }
    },

    today: localVue.prototype.$moment()
  }
}

describe('CalendarDate.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('Normal date', () => {
    beforeEach(() => {
      wrapper = shallowMount(CalendarDate, {
        i18n,
        store,
        propsData: propsData.normalDay,
        localVue
      })
    })

    describe('when CalendarDate was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.isVueInstance()).toBeTruthy()
      })
    })

    describe('when validation propsData', () => {
      it('should validate props', () => {
        const { calendarAttendance, today } = wrapper.vm.$options.props

        expect(calendarAttendance.required).toBeTruthy
        expect(calendarAttendance.type).toBe(Object)
        expect(today.required).toBeTruthy
        expect(today.type).toBe(Object)
      })
    })

    describe('when tooltip && calendar event', () => {
      let calendarDateEl
      let calendarEventEls

      beforeEach(() => {
        calendarDateEl = wrapper.find('.calendar-date')
        calendarEventEls = wrapper.findAll('.calendar-event')
      })

      it('should display data-tooltip with attending_status && leaving_status', () => {
        expect(calendarDateEl.classes()).toContain('tooltip')
        expect(calendarDateEl.attributes('data-tooltip')).toEqual('In: 08:13 - Out: 08:13')
        expect(calendarDateEl.classes()).not.toContain('disabled')
      })

      it('should display calendar event', () => {
        expect(calendarEventEls).toHaveLength(2)
        expect(calendarEventEls.at(0).classes()).toContain('text-success')
        expect(calendarEventEls.at(0).text()).toEqual('Attend OK')
        expect(calendarEventEls.at(1).classes()).toContain('text-error')
        expect(calendarEventEls.at(1).text()).toEqual('Leave Early')
      })

      it('should display today', () => {
        expect(wrapper.find('button.date-item').classes()).toContain('date-today')
        expect(wrapper.find('button.date-item').text()).toEqual(wrapper.vm.localAttendance.day.split('-')[2])
      })
    })
  })

  // Off date
  describe('when off date', () => {
    beforeEach(() => {
      wrapper = shallowMount(CalendarDate, {
        i18n,
        store,
        propsData: propsData.offDay,
        computed: {
          currentCompany: () => {
            return { breakdays: ['saturday', 'sunday'] }
          }
        },

        localVue
      })
    })

    describe('when tooltip', () => {
      let calendarDateEl
      let calendarEventEls

      beforeEach(() => {
        calendarDateEl = wrapper.find('.calendar-date')
        calendarEventEls = wrapper.findAll('.calendar-event')
      })

      it('should no tooltip', () => {
        expect(calendarDateEl.classes()).not.toContain('tooltip')
        expect(calendarDateEl.attributes('data-tooltip')).toEqual('')
      })

      it('should display calendar event', () => {
        expect(calendarEventEls).toHaveLength(1)
        expect(calendarEventEls.at(0).text()).toEqual('Day Off')
      })
    })
  })
})
