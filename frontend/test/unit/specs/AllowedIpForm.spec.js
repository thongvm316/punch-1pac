import store from '@/store'
import i18n from '@/locale'
import AllowedIpForm from '@/components/AllowedIpForm'
import { shallowMount, createLocalValue } from '@vue/test-utils'

const wrapper = shallowMount(AllowedIpForm, {
  i18n,
  store,
  propsData: {
    targetIp: ''
  }
})

const { vm } = wrapper

describe('AllowedIpForm.vue', () => {
  it('should display create allowed ip button', () => {
    expect(vm.$refs.creatAllowedIpButton).to.exist()
    expect(vm.$refs.editAllowedIpButton).not.to.exist()
  })
})
