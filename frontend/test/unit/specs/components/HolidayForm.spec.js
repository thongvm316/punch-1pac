import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'
import setComputed from '../../supports/set-computed'

import store from '@/store'
import i18n from '@/locale'
import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '@/mixins/flatpickr-locale'
import HolidayForm from '@/components/HolidayForm'

const localAddHoliday = jest.fn()
const localEditHoliday = jest.fn()
const clearHolidayErrors = jest.fn()

const targetHoliday = {
  name: 'Tet Holiday',
  started_at: '2019-23-01',
  ended_at: '2020-03-02'
}

describe('HolidayForm.vue', () => {
  describe('when have no props', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(HolidayForm, {
        i18n,
        store,
        mixins: [flatpickrLocale],
        methods: {
          localAddHoliday,
          localEditHoliday,
          clearHolidayErrors
        },
        localVue
      })
    })

    afterEach(() => { wrapper.vm.$destroy() })

    describe('when HolidayForm was mounted', () => {
      it('should render correctly', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.isVueInstance()).toBeTruthy()
      })

      it('should have child components', () => {
        expect(wrapper.find(flatPickr).exists()).toBeTruthy()
        expect(wrapper.find(flatPickr).isVueInstance()).toBeTruthy()
      })
    })

    describe('when props data', () => {
      it('should no have params data', () => {
        const params = {
          name: '',
          started_at: '',
          ended_at: ''
        }

        expect(wrapper.vm.params).toEqual(params)
        expect(wrapper.findAll('.form-group')).toHaveLength(4)
      })

      it('should display localAddHolidayButton', () => {
        expect(wrapper.findAll('.form-group button')).toHaveLength(1)
        expect(wrapper.find({ ref: 'localAddHolidayBtn' }).exists()).toBeTruthy()
      })

      it('should createdHoliday methods was called', () => {
        wrapper.find({ ref: 'localAddHolidayBtn' }).trigger('click')
        expect(localAddHoliday).toHaveBeenCalled()
      })
    })

    describe('when errors', () => {
      describe('when have no errors', () => {
        it('should have no form-input-hint text error', () => {
          expect(wrapper.find('.form-group.has-error').exists()).toBeFalsy()
          expect(wrapper.find('.form-group .form-input-hint').exists()).toBeFalsy()
        })
      })

      describe('when have errors', () => {
        it('should have form-input-hint text error', () => {
          const errors = {
            name: ['has been taken'],
            started_at: ['wrong'],
            ended_at: ['wrong']
          }
          setComputed(wrapper, { errors })
          const formInputHints = wrapper.findAll('.form-group .form-input-hint')

          expect(wrapper.findAll('.form-group.has-error')).toHaveLength(3)
          expect(formInputHints).toHaveLength(3)
          expect(formInputHints.at(0).text()).toEqual('Name has been taken')
          expect(formInputHints.at(1).text()).toEqual('Start at wrong')
          expect(formInputHints.at(2).text()).toEqual('End at wrong')
        })
      })
    })
  })

  describe('when have props data', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(HolidayForm, {
        i18n,
        store,
        mixins: [flatpickrLocale],
        propsData: { targetHoliday },
        methods: {
          localAddHoliday,
          localEditHoliday,
          clearHolidayErrors
        },
        localVue
      })
    })

    it('should have params data', () => {
      expect(wrapper.vm.params).toEqual(targetHoliday)
    })

    it('should display localEditHolidayButton', () => {
      expect(wrapper.findAll('.form-group button')).toHaveLength(1)
      expect(wrapper.find({ ref: 'localEditHolidayBtn' }).exists()).toBeTruthy()
    })

    it('should createdHoliday methods was called', () => {
      wrapper.find({ ref: 'localEditHolidayBtn' }).trigger('click')
      expect(localEditHoliday).toHaveBeenCalled()
    })
  })
})
