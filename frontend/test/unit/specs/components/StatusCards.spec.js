import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import localVue from '../../supports/local-vue'
import statusCardsData from '../../supports/fixtures/status-cards.api'
import StatusCards from '@/components/StatusCards'

const getStatuses = jest.fn()

const localWrapperOps = {
  ...wrapperOps,
  data: function() {
    return {
      month: localVue.prototype.$moment('2019-02-05').format('LL')
    }
  },
  stubs: {
    Datepicker: true
  },
  computed: {
    statuses() {
      return { ...statusCardsData.statuses }
    },
    meta() {
      return { ...statusCardsData.meta }
    }
  },
  methods: {
    getStatuses
  }
}

describe('StatusCards.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(StatusCards, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(getStatuses).toHaveBeenCalled()
    expect(wrapper).toMatchSnapshot()
  })
})
