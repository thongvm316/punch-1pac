import { shallowMount } from '@vue/test-utils'
import wrapperOps from '../../supports/wrapper'
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
const updateCurrentTime = jest.spyOn(Punch.methods, 'updateCurrentTime')
const punchIn = jest.spyOn(Punch.methods, 'punchIn').mockResolvedValue(fakePunchResponse.in)
const punchOut = jest.spyOn(Punch.methods, 'punchOut').mockResolvedValue(fakePunchResponse.out)
const openConfirmDialog = jest.spyOn(Punch.mixins[0].methods, 'openConfirmDialog')
const PUNCH_INIT_ATTENDANCE = jest.spyOn(Punch.methods, 'PUNCH_INIT_ATTENDANCE')
const SET_FLASH_MESSAGE = jest.spyOn(Punch.methods, 'SET_FLASH_MESSAGE')

describe('PopupChangePassword.vue', () => {
  let wrapper

  afterEach(() => { wrapper.vm.$destroy() })

  describe('when user have not punch in yet', () => {
    const localWrapperOps = {
      ...wrapperOps,
      stubs: {
        ConfirmDialog: true
      },
      computed: {
        isInited () {
          return false
        },
        attendance () {
          return {}
        },
        currentUser() {
          return { id: 0 }
        }
      }
    }
    beforeEach(() => {
      wrapper = shallowMount(Punch, localWrapperOps)
    })

    it('component should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(updateCurrentTime).toHaveBeenCalled()
      expect(PUNCH_INIT_ATTENDANCE).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })

    it('should call debouncePunchIn when user click punch In', async () => {
      wrapper.find({ ref: 'btnPunchIn' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(debouncePunchIn).toHaveBeenCalled()
      expect(punchIn).toHaveBeenCalledWith(0)
      expect(SET_FLASH_MESSAGE).toHaveBeenCalledWith({ message: 'You punched in at 14:30' })
    })
  })

  describe('when user have punched in but not punched out yet', () => {
    const localWrapperOps = {
      ...wrapperOps,
      stubs: {
        ConfirmDialog: true
      },
      computed: {
        isInited () {
          return false
        },
        attendance () {
          return fakePunchResponse.in.data
        },
        currentUser() {
          return { id: 0 }
        }
      }
    }
    beforeEach(() => {
      wrapper = shallowMount(Punch, localWrapperOps)
    })

    it('component should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(updateCurrentTime).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })

    it('should openConfirmDialog haveBeenCalled', async () => {
      wrapper.find({ ref: 'btnPunchOut' }).trigger('click')
      await wrapper.vm.$nextTick()

      expect(openConfirmDialog).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })

    it('should trigger punchOut', async () => {
      wrapper.vm.debouncePunchOut()
      await wrapper.vm.$nextTick()

      expect(punchOut).toHaveBeenCalledWith(0)
      expect(SET_FLASH_MESSAGE).toHaveBeenCalledWith({ message: 'You punched out at 17:30' })
    })
  })

  describe('when user have punched in and out', () => {
    const localWrapperOps = {
      ...wrapperOps,
      computed: {
        isInited() { return false },
        attendance() { return fakePunchResponse.out.data }
      }
    }

    wrapper = shallowMount(Punch, localWrapperOps)

    it('should not show btn PunchIn, btn PunchOut', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
