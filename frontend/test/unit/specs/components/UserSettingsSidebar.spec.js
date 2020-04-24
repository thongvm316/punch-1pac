import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import UserSettingsSidebar from '@/components/UserSettingsSidebar'

const localWrapperOps = {
  ...wrapperOps,
  stubs: {
    PIcoUser: true,
    PIcoKey: true,
    PIcoShield: true
  }
}
const setActive = jest.spyOn(UserSettingsSidebar.mixins[0].methods, 'setActive')

describe('UserSettingsSidebar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserSettingsSidebar, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when UserSettingsSidebar mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when setActive', () => {
    it('should active Holidays tab', async () => {
      wrapper.findAll('li').at(2).trigger('click')
      await wrapper.vm.$nextTick()

      expect(setActive).toHaveBeenCalledWith('Security')
      expect(wrapper).toMatchSnapshot()
    })

    it('should emit @active', async () => {
      wrapper.findAll('li').at(2).trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().active).toHaveLength(1)
      expect(wrapper.emitted().active[0]).toEqual(['Security'])
    })
  })
})
