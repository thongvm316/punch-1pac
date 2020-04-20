import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import Main from '@/layouts/Main'

const scopedSlots = {
  default: '<p class="default-scoped">Dashboard page</p>'
}

Object.assign(wrapperOps, {
  propsData: {
    title: 'Dashboard'
  },
  stubs: {
    Announcements: true,
    RemindPunchIn: true
  },
  scopedSlots
})

const wrapper = shallowMount(Main, wrapperOps)

describe('Main.vue', () => {
  it('should render Main layout correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })
})
