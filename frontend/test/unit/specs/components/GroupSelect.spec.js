import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'

import GroupSelect from '@/components/GroupSelect'

const fetchAllGroups = jest.fn()
const updateValue = jest.spyOn(GroupSelect.methods, 'updateValue')

const groups = [
  {
    id: 0,
    name: '1pacvn'
  },
  {
    id: 1,
    name: 'gumi'
  }
]

const scopedSlots = {
  placeholder: '<option>Choose a group</options>'
}

describe('GroupSelect.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupSelect, {
      methods: {
        fetchAllGroups,
        updateValue
      },
      scopedSlots,
      localVue
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupSelect was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should have slot', () => {
      expect(wrapper.findAll('option').at(0).text()).toEqual('Choose a group')
    })
  })

  describe('when have groups data', () => {
    it('should have groups data', async () => {
      wrapper.setData({ groups })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.groups).toHaveLength(2)
      expect(wrapper.findAll('.form-select option')).toHaveLength(3)
    })
  })

  describe('when emitted', () => {
    it('should updateValue method called', () => {
      wrapper.find('select').trigger('change')
      expect(updateValue).toHaveBeenCalled()
      expect(wrapper.emitted('input')).toBeTruthy()
    })
  })
})
