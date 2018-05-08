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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'flash',

  computed: {
    ...mapState('flash', [
      'message',
      'type',
      'timeout'
    ])
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ])
  },

  watch: {
    message: function (newMsg) {
      if (newMsg) setTimeout(() => { this.setFlashMsg({ message: null }) }, this.timeout)
    }
  }
}
</script>
