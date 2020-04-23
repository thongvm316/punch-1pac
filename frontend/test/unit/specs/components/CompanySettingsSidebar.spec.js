import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import CompanySettingsSidebar from '@/components/CompanySettingsSidebar'

const setActive = jest.spyOn(CompanySettingsSidebar.mixins[0].methods, 'setActive')

const localWrapperOps = {
  ...wrapperOps,
  data() {
    return {
      activeTabName: 'Profile'
    }
  },
  stubs: {
    PIcoCompanyProfile: true,
    PIcoUsers: true,
    PIcoBusinessDay: true,
    PIcoHoliday: true,
    PIcoAllowedIp: true
  }
}
const wrapper = shallowMount(CompanySettingsSidebar, localWrapperOps)

describe('CompanySettingsSidebar.vue', () => {
  describe('when mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when setActive', () => {
    it('should active Holidays tab', async () => {
      wrapper.findAll('li').at(3).trigger('click')
      await wrapper.vm.$nextTick()

      expect(setActive).toHaveBeenCalledWith('Holidays')
      expect(wrapper).toMatchSnapshot()
    })

    it('should emit @active', async () => {
      wrapper.findAll('li').at(3).trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().active).toHaveLength(1)
      expect(wrapper.emitted().active[0]).toEqual(['Holidays'])
    })
  })
})
