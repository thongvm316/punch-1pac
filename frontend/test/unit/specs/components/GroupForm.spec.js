import { shallowMount } from '@vue/test-utils'

import localVue from '../../supports/local-vue'
import setComputed from '../../supports/set-computed'

import store from '@/store'
import i18n from '@/locale'
import GroupForm from '@/components/GroupForm'

const targetGroup = {
  name: '1pacvn',
  description: '1pacvn team',
  image: '/'
}

const localAddGroup = jest.fn()
const localEditGroup = jest.fn()

describe('GroupForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupForm, {
      i18n,
      store,
      methods: { localAddGroup },
      localVue
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when GroupForm was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render created GroupForm', () => {
      expect(wrapper.findAll('.form-group')).toHaveLength(4)
      expect(wrapper.findAll('.form-group button')).toHaveLength(1)
      expect(wrapper.find({ ref: 'localAddGroupButton' }).exists()).toBe(true)
    })
  })

  describe('when errors', () => {
    it('should render no form-input-hint error text', () => {
      expect(wrapper.findAll('p.form-input-hint')).toHaveLength(0)
    })

    it('should render errors text', async () => {
      const errors = {
        name: ['have been taken'],
        image: ['too large'],
        description: ['wrong']
      }
      wrapper.setData({ errors })
      await wrapper.vm.$nextTick()

      expect(wrapper.findAll('p.form-input-hint')).toHaveLength(3)
      expect(wrapper.findAll('p.form-input-hint').at(0).text()).toEqual('Name have been taken')
      expect(wrapper.findAll('p.form-input-hint').at(1).text()).toEqual('Image too large')
      expect(wrapper.findAll('p.form-input-hint').at(2).text()).toEqual('Description wrong')
    })

    it('should render 1 error', async () => {
      const errors = {
        name: ['have been taken']
      }
      wrapper.setData({ errors })
      await wrapper.vm.$nextTick()

      expect(wrapper.findAll('p.form-input-hint')).toHaveLength(1)
      expect(wrapper.findAll('p.form-input-hint').at(0).text()).toEqual('Name have been taken')
    })
  })

  describe('when addGroup method', () => {
    it('should call localAddGroup methods', () => {
      wrapper.find({ ref: 'localAddGroupButton' }).trigger('click')
      expect(localAddGroup).toHaveBeenCalled()
    })
  })
})

describe('when GroupForm have props data', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GroupForm, {
      i18n,
      store,
      methods: { localEditGroup },
      propsData: { targetGroup },
      localVue
    })
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when render GroupForm', () => {
    it('should render edit Group Form', () => {
      expect(wrapper.vm.params).toEqual(targetGroup)
      expect(wrapper.findAll('.form-group')).toHaveLength(4)
      expect(wrapper.findAll('.form-group button')).toHaveLength(1)
      expect(wrapper.find({ ref: 'localEditGroupButton' }).exists()).toBe(true)
    })
  })

  describe('when editGroup method', () => {
    it('should call localEditGroup methods', () => {
      wrapper.find({ ref: 'localEditGroupButton' }).trigger('click')
      expect(localEditGroup).toHaveBeenCalled()
    })
  })
})
