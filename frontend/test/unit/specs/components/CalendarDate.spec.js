import { shallowMount } from '@vue/test-utils'
import localVue from '../../supports/local-vue'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import attendancesData from '../../supports/fixtures/attendances.api'
import punchData from '../../supports/fixtures/punch.api'
import CalendarDate from '@/components/CalendarDate'

const today = localVue.prototype.$moment()

const attendances = {
  normalday: [...attendancesData.attendances][0],

  offDay: {
    day: '2019-12-03',
    off_status: 'annual_leave'
  },

  weeksDay: {
    day: '2019-12-08',
  },

  specialDay: {
    day: '2019-12-13',
    holiday: {
      name: 'Tet holiday'
    }
  }
}

describe('CalendarDate.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  // Normal date
  describe('when normal date', () => {
    beforeEach(() => {
      const newWrapperOps = {
        ...wrapperOps,
        propsData: {
          calendarAttendance: attendances.normalday,
          today
        },
        computed: {
          currentCompany: () => initialStatesData.currentCompany,
          meta: () => initialStatesData.meta,
          attendance: () => punchData
        }
      }
      wrapper = shallowMount(CalendarDate, newWrapperOps)
    })

    describe('when CalendarDate was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when watcher attendance', () => {
      it('should render new attendance', async () => {
        setComputed(wrapper, {
          attendance: {
            ...punchData,
            attended_at: '10:45',
            attending_status: 'attend_late',
            left_at: '20:45',
          }
        })

        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  // Off date
  describe('when off date', () => {
    beforeEach(() => {
      const newWrapperOps = {
        ...wrapperOps,
        propsData: {
          calendarAttendance: attendances.offDay,
          today
        },
        computed: {
          currentCompany: () => initialStatesData.currentCompany,
          meta: () => initialStatesData.meta,
          attendance: () => punchData
        }
      }
      wrapper = shallowMount(CalendarDate, newWrapperOps)
    })

    describe('when CalendarDate was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  // Special day
  describe('when special day', () => {
    beforeEach(() => {
      const newWrapperOps = {
        ...wrapperOps,
        propsData: {
          calendarAttendance: attendances.specialDay,
          today
        },
        computed: {
          currentCompany: () => initialStatesData.currentCompany,
          meta: () => initialStatesData.meta,
          attendance: () => punchData
        }
      }
      wrapper = shallowMount(CalendarDate, newWrapperOps)
    })

    describe('when CalendarDate was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  // Weekend day
  describe('when week day', () => {
    beforeEach(() => {
      const newWrapperOps = {
        ...wrapperOps,
        propsData: {
          calendarAttendance: attendances.weeksDay,
          today
        },
        computed: {
          currentCompany: () => initialStatesData.currentCompany,
          meta: () => initialStatesData.meta,
          attendance: () => punchData
        }
      }
      wrapper = shallowMount(CalendarDate, newWrapperOps)
    })

    describe('when CalendarDate was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
