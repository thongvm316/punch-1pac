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

const localWrapperOps = {
  ...wrapperOps,
  propsData: {
    namespace: 'groupRequests',
    action: 'getRequests'
  },

  computed: {
    pager() {
      return {
        ...pager,
        current_page: 1
      }
    }
  },

  stubs: {
    PIcoPrevArrow: true,
    PIcoNextArrow: true
  },

  methods: {
    buildItems
  }
}

describe('Pagination.vue', () => {
  let wrapper, prevPageButton, nextPageButton

  beforeEach(() => {
    wrapper = shallowMount(Pagination, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when Pagination was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(buildItems).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })

    it('page 2 should be actived', async () => {
      setComputed(wrapper, { pager })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when click on page item', () => {
    it('should call go method when click page 2', async () => {
      wrapper.findAll({ ref: 'pageNumber' }).at(1).find('a').trigger('click')
      await wrapper.vm.$nextTick()

      expect(go).toHaveBeenCalledWith(2)
      expect(fetchItems).toHaveBeenCalledWith(2)
    })
  })

  describe('when current page is last', () => {
    it('should not show button next page', async () => {
      setComputed(wrapper, {
        pager: {
          ...pager,
          current_page: 3
        }
      })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })
})
