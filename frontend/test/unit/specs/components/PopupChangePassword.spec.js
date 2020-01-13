import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import PopupChangePassword from '@/components/PopupChangePassword'

const remind = jest.spyOn(PopupChangePassword.methods, 'remind')

describe('PopupChangePassword.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when PopupChangePassword was mounted ', () => {
    it('should render correctly', () => {
      wrapper = shallowMount(PopupChangePassword, wrapperOps)
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('when currentUser have changed the password', () => {
    const wrapperOpsChangePw = {
      ...wrapperOps,
      computed: {
        currentUser() {
          return { password_changed: true }
        }
      }
    }

    it('should not show the modal change password', () => {
      wrapper = shallowMount(PopupChangePassword, wrapperOpsChangePw)
      expect(wrapper.classes()).not.toContain('active')
      expect(wrapper.vm.open).toBeFalsy()
    })
  })

  describe('when currentUser have not changed the password', () => {
    const wrapperOpsNotChangePw = {
      ...wrapperOps,
      computed: {
        currentUser() {
          return { password_changed: false }
        }
      },
      methods: {
        remind
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(PopupChangePassword, wrapperOpsNotChangePw)
    })

    it('should show the modal change password', () => {
      expect(wrapper.classes()).toContain('active')
      expect(wrapper.vm.open).toBeTruthy()
    })

    it('should call remind when trigger click on overlay', async () => {
      wrapper.find('.modal-overlay').trigger('click')
      await wrapper.vm.$nextTick()

      expect(remind).toHaveBeenCalled()
    })

    it('should call remind when trigger click on btn close modal', async () => {
      wrapper.find({ ref: 'btnCloseModal' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(remind).toHaveBeenCalled()
    })

    it('should call remind when trigger click on btnChangePassword', async () => {
      wrapper.find({ ref: 'btnChangePassword' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(remind).toHaveBeenCalled()
    })

    it('should call remind when trigger click on btnCancel', async () => {
      wrapper.find({ ref: 'btnCancel' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(remind).toHaveBeenCalled()
    })
  })
})
