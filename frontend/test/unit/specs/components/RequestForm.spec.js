import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
import attendancesData from '../../supports/fixtures/attendances.api'
import requestsData from '../../supports/fixtures/requests.api'
import RequestForm from '@/components/RequestForm'

const localAddRequest = jest.spyOn(RequestForm.methods, 'localAddRequest')
const localEditRequest = jest.spyOn(RequestForm.methods, 'localEditRequest')
const addRequest = jest.spyOn(RequestForm.methods, 'addRequest').mockResolvedValue(null)
const updateRequest = jest.spyOn(RequestForm.methods, 'updateRequest').mockResolvedValue(null)
const handleSuccess = jest.spyOn(RequestForm.mixins[1].methods, 'handleSuccess')

const attendance = [...attendancesData.attendances][0]
const request = [...requestsData.requests][0]
const errors = {
  attended_at: ['attended_at wrong'],
  left_at: ['left_at wrong']
}

describe('RequestForm.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when have no props', () => {
    const localWrapperOps = {
      ...wrapperOps,
      stubs: {
        flatPickr: true
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(RequestForm, localWrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })
  })


  describe('when attendance props', () => {
    const localWrapperOps = {
      ...wrapperOps,
      propsData: { attendance },
      stubs: {
        flatPickr: true
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(RequestForm, localWrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })

    it('should localAddRequest toHaveBeenCalled', async () => {
      wrapper.find({ ref: 'localAddRequestButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localAddRequest).toHaveBeenCalled()
      expect(addRequest).toHaveBeenCalledWith(wrapper.vm.params)
      expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Request is created' })
    })
  })

  describe('when request props', () => {
    const localWrapperOps = {
      ...wrapperOps,
      propsData: { request },
      stubs: {
        flatPickr: true
      },
      computed: {
        isDisabled() {
          return false
        }
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(RequestForm, localWrapperOps)
    })

    it('should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
    })

    it('should localEditRequest toHaveBeenCalled', async () => {
      wrapper.find({ ref: 'localEditRequestButton' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(localEditRequest).toHaveBeenCalled()
      expect(updateRequest).toHaveBeenCalledWith({ id: request.id, params: wrapper.vm.params })
      expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'afterModify', message: 'Request is updated' })
    })
  })

  describe('when errors', () => {
    const localWrapperOps = {
      ...wrapperOps,
      propsData: { request },
      stubs: {
        flatPickr: true
      },
      computed: {
        errors() {
          return errors
        }
      }
    }

    beforeEach(() => {
      wrapper = shallowMount(RequestForm, localWrapperOps)
    })

    it('should render errors', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
