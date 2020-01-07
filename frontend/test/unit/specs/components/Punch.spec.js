import { shallowMount } from '@vue/test-utils'

import wrapperOps from '../../supports/wrapper'

import ConfirmDialog from '@/components/ConfirmDialog'
import Punch from '@/components/Punch'

const fakePunchResponse = {
  in: {
    data: {
      attended_at: '14:30',
      left_at: null
    }
  },
  out: {
    data: {
      attended_at: '14:30',
      left_at: '17:30'
    }
  }
}

const debouncePunchIn = jest.spyOn(Punch.methods, 'debouncePunchIn')
const debouncePunchOut = jest.spyOn(Punch.methods, 'debouncePunchOut')
const setFlashMsg = jest.spyOn(Punch.methods, 'setFlashMsg')
const updateCurrentTime = jest.fn()
const initAttendance = jest.fn()
const punchIn = jest.fn().mockResolvedValue(fakePunchResponse.in)
const punchOut = jest.fn().mockResolvedValue(fakePunchResponse.out)

describe('PopupChangePassword.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  it('component should render correctly', () => {
    wrapper = shallowMount(Punch, wrapperOps)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find(ConfirmDialog).exists()).toBeTruthy()
  })

  describe('when user have not punch in yet', () => {
    beforeEach(() => {
      wrapper = shallowMount(Punch, {
        ...wrapperOps,
        methods: {
          debouncePunchIn,
          setFlashMsg,
          updateCurrentTime,
          initAttendance,
          punchIn
        },
        computed: {
          isInited() { return false },
          attendance() { return {} }
        }
      })
    })

    it('should call updateCurrentTime', () => {
      expect(updateCurrentTime).toHaveBeenCalled()
    })

    it('should call initAttendance', () => {
      expect(initAttendance).toHaveBeenCalled()
    })

    it('should show punchIn btn, display timer', () => {
      expect(wrapper.findAll('.punch span').length).toBe(1)

      expect(wrapper.find({ ref: 'btnPunchIn' }).exists()).toBeTruthy()
      expect(wrapper.find({ ref: 'btnPunchOut' }).exists()).toBeFalsy()
    })

    it('should call debouncePunchIn when user click punch In', async () => {
      wrapper.find({ ref: 'btnPunchIn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(debouncePunchIn).toHaveBeenCalled()
      expect(punchIn).toHaveBeenCalled()
      expect(setFlashMsg).toHaveBeenCalled()
    })
  })

  describe('when user have punched in but not punched out yet', () => {
    beforeEach(() => {
      wrapper = shallowMount(Punch, {
        ...wrapperOps,
        methods: {
          debouncePunchOut,
          setFlashMsg,
          punchOut
        },
        computed: {
          isInited() { return true },
          attendance() { return fakePunchResponse.in.data }
        }
      })
    })

    it('should display correct timer', () => {
      expect(wrapper.findAll('.punch span').length).toBe(3)
    })

    it('should show PunchOut btn', () => {
      expect(wrapper.find({ ref: 'btnPunchOut' }).exists()).toBeTruthy()
    })

    it('should not show btn Punch In', () => {
      expect(wrapper.find({ ref: 'timeOut' }).exists()).toBeFalsy()
    })

    describe('when click punchOut btn', () => {
      beforeEach(async () => {
        wrapper.find({ ref: 'btnPunchOut' }).trigger('click')
        await wrapper.vm.$nextTick()
      })

      it('should show confirm dialog when click punchOut btn', () => {
        expect(wrapper.find(ConfirmDialog).isVisible()).toBeTruthy()
      })

      it('shoud call debouncePunchOut when click confirm', async () => {
        wrapper.vm.debouncePunchOut() // fake click confirm
        await wrapper.vm.$nextTick()

        expect(punchOut).toHaveBeenCalled()
        expect(debouncePunchOut).toHaveBeenCalled()
        expect(wrapper.vm.isOpenConfirmDialog).toBeFalsy()
        expect(setFlashMsg).toHaveBeenCalled()
      })
    })
  })

  describe('when user have punched in and out', () => {
    beforeEach(() => {
      wrapper = shallowMount(Punch, {
        ...wrapperOps,
        computed: {
          isInited() { return true },
          attendance() { return fakePunchResponse.out.data }
        }
      })
    })

    it('should display correct timer', () => {
      expect(wrapper.findAll('.punch span').length).toBe(3)
    })

    it('should not show btn PunchIn, btn PunchOut', () => {
      expect(wrapper.find({ ref: 'btnPunchIn' }).exists()).toBeFalsy()
      expect(wrapper.find({ ref: 'btnPunchOut' }).exists()).toBeFalsy()
    })
  })
})
