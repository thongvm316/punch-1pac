import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import localVue from '../../supports/local-vue'

import Datepicker from 'vuejs-datepicker'
import StatusCards from '@/components/StatusCards'

const onInputDatepicker = jest.spyOn(StatusCards.methods, 'onInputDatepicker')
const month = localVue.prototype.$moment().format('LL')
Object.assign(wrapperOps, {
  data: function() {
    return {
      month
    }
  },
  methods: { onInputDatepicker }
})

describe('StatusCards.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(StatusCards, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find(Datepicker).exists()).toBeTruthy()
  })

  it('should return onInputDatePicker', () => {
    wrapper.vm.onInputDatepicker()
    const localMonth = wrapper.vm.month
    expect(localMonth).toEqual(localVue.prototype.$moment(localMonth).format('YYYY-MM-DD'))
  })
})
