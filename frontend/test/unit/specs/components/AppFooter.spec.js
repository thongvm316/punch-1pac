import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import initialStatesData from '../../supports/fixtures/initial-states.api'
import AppFooter from '@/components/AppFooter'

const wrapper = shallowMount(AppFooter, wrapperOps)

describe('when AppFooter was mounted', () => {
  it('should render correctly', () => {
    setComputed(wrapper, {
      meta: initialStatesData.meta
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })
})
