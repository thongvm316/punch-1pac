<template>
  <transition name="fade">
    <div class="toast toast-success text-center toast-flash" v-if="message">
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
      'message'
    ])
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ])
  },

  watch: {
    message: function (newMsg) {
      if (newMsg) setTimeout(() => { this.setFlashMsg(null) }, 2000)
    }
  }
}
</script>
