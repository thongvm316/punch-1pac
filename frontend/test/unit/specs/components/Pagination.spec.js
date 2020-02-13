import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'
import setComputed from '../../supports/set-computed'

import Pagination from '@/components/Pagination'

const go = jest.spyOn(Pagination.methods, 'go')
const buildItems = jest.fn().mockReturnValue([1, 2, 3])
const fetchItems = jest.spyOn(Pagination.methods, 'fetchItems')
const pager = {
  current_page: 2,
  next_page: 3,
  prev_page: 1,
  per_page: 20,
  total_pages: 3
}

Object.assign(wrapperOps, {
  propsData: {
    namespace: 'groupRequests',
    action: 'getRequests'
  },
  methods: {
    go,
    buildItems,
    fetchItems
  }
})

describe('Pagination.vue', () => {
  let wrapper, prevPageButton, nextPageButton

  beforeEach(() => {
    wrapper = shallowMount(Pagination, wrapperOps)
    prevPageButton = wrapper.find({ ref: 'pagePrev' })
    nextPageButton = wrapper.find({ ref: 'pageNext' })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Pagination was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should display 3 page', () => {
      expect(wrapper.vm.items).toHaveLength(3)
      expect(wrapper.findAll({ ref: 'pageNumber' })).toHaveLength(3)
    })

    it('should called buildItems first time', () => {
      expect(buildItems).toHaveBeenCalledTimes(1)
    })

    it('page 2 should be actived', async () => {
      setComputed(wrapper, { pager })
      await wrapper.vm.$nextTick()

      expect(wrapper.findAll({ ref: 'pageNumber' }).at(1).classes()).toContain('active')
    })

    describe('when click on page item', () => {
      it('should call go method when click page 2', async () => {
        wrapper.findAll({ ref: 'pageNumber' }).at(1).find('a').trigger('click')
        await wrapper.vm.$nextTick()

        expect(go).toHaveBeenCalledWith(2)
        expect(fetchItems).toHaveBeenCalledWith(2)
      })
    })

    describe('when current page is 2', () => {
      beforeEach(async () => {
        setComputed(wrapper, { pager })
        await wrapper.vm.$nextTick()
      })

      it('page 2 should be actived', () => {
        expect(wrapper.findAll({ ref: 'pageNumber' }).at(1).classes()).toContain('active')
      })

      it('should show button prev page and next page', () => {
        expect(prevPageButton.isVisible()).toBeTruthy()
        expect(nextPageButton.isVisible()).toBeTruthy()
      })
    })

    describe('when current page is 1 (first)', () => {
      it('should not show button prev page', async () => {
        setComputed(wrapper, {
          pager: {
            ...pager,
            current_page: 1
          }
        })
        await wrapper.vm.$nextTick()

        expect(prevPageButton.isVisible()).toBeFalsy()
        expect(nextPageButton.isVisible()).toBeTruthy()
      })
    })

    describe('when current page is 3 (last)', () => {
      it('should not show button next page', async () => {
        setComputed(wrapper, {
          pager: {
            ...pager,
            current_page: 3
          }
        })
        await wrapper.vm.$nextTick()

        expect(prevPageButton.isVisible()).toBeTruthy()
        expect(nextPageButton.isVisible()).toBeFalsy()
      })
    })
  })
})
