import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'
import Announcements from '@/components/Announcements'

const readAnnouncement = jest.spyOn(Announcements.methods, 'readAnnouncement')

describe('Announcements.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Announcements, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Announcements was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when have header announcement', () => {
    it('should dislay normal announcement', () => {
      const announComputed = [
        { status: 'normal', content: 'normal annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })

    it('should dislay urgent announcement', () => {
      const announComputed = [
        { status: 'urgent', content: 'urgent annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })

    it('should display both announcements', () => {
      const announComputed = [
        { status: 'normal', content: 'normal annoucement' },
        { status: 'urgent', content: 'urgent annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when trigger on read announcement', () => {
    it('should call method', () => {
      const announComputed = [
        { status: 'urgent', content: 'urgent annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.find('.toast > button').trigger('click')

      expect(readAnnouncement).toHaveBeenCalled()
    })
  })
})
