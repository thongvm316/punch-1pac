import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import GroupForm from '@/components/GroupForm'

const targetGroup = {
  id: 0,
  name: '1pacvn',
  description: '1pacvn team',
  image: '/'
}
const localAddGroup = jest.spyOn(GroupForm.methods, 'localAddGroup')
const localEditGroup = jest.spyOn(GroupForm.methods, 'localEditGroup')
const addGroup = jest.spyOn(GroupForm.methods, 'addGroup').mockResolvedValue(null)
const updateGroup = jest.spyOn(GroupForm.methods, 'updateGroup').mockResolvedValue(null)
const handleSuccess = jest.spyOn(GroupForm.mixins[0].methods, 'handleSuccess')
const localWrapperOps = {
  ...wrapperOps,
  computed: {
    isDisabled: () => false
  }
}

describe('GroupForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupForm, localWrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupForm was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })

    it('should render exists groups', async () => {
      wrapper.setProps({
        targetGroup
      })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when methods', () => {
    it('should localAddGroup', async () => {
      wrapper.find({ ref: 'localAddGroupButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localAddGroup).toHaveBeenCalled()
      expect(addGroup).toHaveBeenCalledWith(wrapper.vm.params)
      expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Group is created' })
    })

    it('should localEditGroup', async () => {
      wrapper.setProps({
        targetGroup
      })
      await wrapper.vm.$nextTick()
      wrapper.find({ ref: 'localEditGroupButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localEditGroup).toHaveBeenCalled()
      expect(updateGroup).toHaveBeenCalledWith({ groupId: 0, editParams: wrapper.vm.params })
      expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Group is updated' })
    })
  })


  describe('when errors', () => {
    it('should render errors text', async () => {
      const errors = {
        name: ['have been taken'],
        image: ['too large'],
        description: ['wrong']
      }
      wrapper.setData({ errors })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })
})
