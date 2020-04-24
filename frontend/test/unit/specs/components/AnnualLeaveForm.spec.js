import { shallowMount } from '@vue/test-utils'
import setComputed from '../../supports/set-computed'
import requestsData from '../../supports/fixtures/report.api'
import wrapperOps from '../../supports/wrapper'
import AnnualLeaveForm from '@/components/AnnualLeaveForm'

const create = jest.spyOn(AnnualLeaveForm.methods, 'create')
const update = jest.spyOn(AnnualLeaveForm.methods, 'update')
const addRequest = jest.spyOn(AnnualLeaveForm.methods, 'addRequest').mockResolvedValue(null)
const updateRequest = jest.spyOn(AnnualLeaveForm.methods, 'updateRequest').mockResolvedValue(null)
const handleSuccess = jest.spyOn(AnnualLeaveForm.mixins[1].methods, 'handleSuccess')
const CLEAR_REQUEST_ERRORS = jest.spyOn(AnnualLeaveForm.methods, 'CLEAR_REQUEST_ERRORS')

Object.assign(wrapperOps, {
  stubs: {
    flatPickr: true
  }
})

describe('AnnualLeaveForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AnnualLeaveForm, wrapperOps)
  })

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when AnnualLeaveForm was mounted', () => {
    it('should render correctly', () => {
      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when error', () => {
    it('should display error attendance_day', async () => {
      wrapper.setData({ errors: { attendance_day: ['something wrong'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })

    it('should display error reason', async () => {
      wrapper.setData({ errors: { reason: ['error'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })

    it('should display both errors', async () => {
      wrapper.setData({ errors: { attendance_day: ['attendance_day error'], reason: ['reason error'] } })
      await wrapper.vm.$nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when create request', () => {
    it('should call create method', async () => {
      setComputed(wrapper, {
        dataRequest: requestsData[0],
        isDisable: false
      })
      wrapper.find({ ref: 'createAnnualLeaveBtn' }).trigger('click')
      await wrapper.vm.$nextTick

      expect(create).toHaveBeenCalled()
      expect(addRequest).toHaveBeenCalledWith(requestsData[0])
      expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'finishRequest', message: 'Request is created' })
      expect(CLEAR_REQUEST_ERRORS).toHaveBeenCalled()
    })
  })

  describe('when update request', () => {
    beforeEach(() => {
      wrapper.setProps({ request: { id: 0, reason: 'personal issue' } })
      setComputed(wrapper, {
        isDisable: false
      })
    })

    it('should render update button', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call update method', async () => {
      wrapper.find({ ref: 'updateAnnualLeaveBtn' }).trigger('click')
      await wrapper.vm.$nextTick

      expect(update).toHaveBeenCalled()
      expect(updateRequest).toHaveBeenCalledWith({ id: 0, params: { attendance_day: '', kind: 'annual_leave', reason: '' } })
      expect(handleSuccess).toHaveBeenCalledWith({ emitType: 'finishRequest', message: 'Request is updated' })
      expect(CLEAR_REQUEST_ERRORS).toHaveBeenCalled()
    })
  })
})
