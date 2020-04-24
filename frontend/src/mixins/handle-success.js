import { SET_FLASH_MESSAGE } from '@/store/mutation-types'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('flash', [SET_FLASH_MESSAGE]),

    handleSuccess(data) {
      this[SET_FLASH_MESSAGE]({ message: data.message })
      data.emitType && this.$emit(data.emitType)
      // this.isDisable = false
    }
  }
}
