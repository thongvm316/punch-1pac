import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import groupsData from '../../supports/fixtures/groups.api'
import GroupSelect from '@/components/GroupSelect'

const groups = [...groupsData.groups]
const scopedSlots = { placeholder: '<option>Choose a group</option>' }
const getGroups = jest.spyOn(GroupSelect.methods, 'getGroups')
const updateValue = jest.spyOn(GroupSelect.methods, 'updateValue')

const localWrapperOps = {
  ...wrapperOps,
  scopedSlots,
  computed: {
    groups: () => groups
  }
}

describe('GroupSelect.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupSelect, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupSelect was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(getGroups).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when updateValue', () => {
    it('should updateValue method called', () => {
      wrapper.find('select').trigger('change')

      expect(updateValue).toHaveBeenCalled()
      expect(wrapper.emitted('input')).toBeTruthy()
    })
  })
})
