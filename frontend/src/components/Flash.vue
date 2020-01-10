<template>
  <transition name="fade">
    <div class="toast toast-success text-center toast-flash"
      :class="{ 'toast-success': type === 'success', 'toast-error': type === 'error' }"
      v-if="message">
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { SET_FLASH_MESSAGE } from '../store/mutation-types'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'flash',

  computed: {
    ...mapState('flash', ['message', 'type', 'timeout'])
  },

  methods: {
    ...mapMutations('flash', [SET_FLASH_MESSAGE])
  },

  watch: {
    message: function(newMsg) {
      if (newMsg) {
        setTimeout(() => {
          this[SET_FLASH_MESSAGE]({ message: null })
        }, this.timeout)
      }
    }
  }
}
</script>
