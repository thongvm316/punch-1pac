import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import Announcements from '@/components/Announcements'

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
    })
  })

  describe('when have no header announcement', () => {
    it('should no have header announcement', () => {
      expect(wrapper.findAll('.toast')).toHaveLength(0)
    })
  })

  describe('when have header announcement', () => {
    it('should dislay normal announcement', () => {
      const announComputed = [
        { status: 'normal', content: 'normal annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.vm.$nextTick()

      expect(wrapper.findAll('.toast')).toHaveLength(1)
      expect(wrapper.find('.toast-success').exists()).toBe(true)
      expect(wrapper.find('.toast-success').text()).toEqual('normal annoucement')
    })

    it('should dislay urgent announcement', () => {
      const announComputed = [
        { status: 'urgent', content: 'urgent annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.vm.$nextTick()

      expect(wrapper.findAll('.toast')).toHaveLength(1)
      expect(wrapper.find('.toast-warning').exists()).toBe(true)
      expect(wrapper.find('.toast-warning').text()).toEqual('urgent annoucement')
    })

    it('should display both announcements', () => {
      const announComputed = [
        { status: 'normal', content: 'normal annoucement' },
        { status: 'urgent', content: 'urgent annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.vm.$nextTick()

      expect(wrapper.findAll('.toast')).toHaveLength(2)
      expect(wrapper.find('.toast-warning').exists()).toBe(true)
      expect(wrapper.find('.toast-warning').text()).toEqual('urgent annoucement')
      expect(wrapper.find('.toast-success').exists()).toBe(true)
      expect(wrapper.find('.toast-success').text()).toEqual('normal annoucement')
    })
  })

  describe('when trigger on read announcement', () => {
    it('should call method', () => {
      const readAnnouncement = jest.fn()
      const announComputed = [
        { status: 'urgent', content: 'urgent annoucement' }
      ]
      setComputed(wrapper, { headerAnnouncements: announComputed })
      wrapper.setMethods({ readAnnouncement })
      wrapper.find('.toast > button').trigger('click')

      expect(readAnnouncement).toHaveBeenCalled()
    })
  })
})
