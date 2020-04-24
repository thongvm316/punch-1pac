import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import GroupTab from '@/components/GroupTab'

const propsData = {
  groupId: '1',
  hasUser: true
}

const localWrapperOps = {
  ...wrapperOps,
  propsData
}

describe('GroupTab.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupTab, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupTab was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
