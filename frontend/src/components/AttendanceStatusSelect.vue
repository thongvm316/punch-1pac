<template>
  <select class="form-select" @change="updateValue($event)">
    <slot name="placeholder"></slot>
    <option :value="status" v-for="status in meta.attendance_statuses">{{ $t(`meta.attendance_statuses.${status}`) }}</option>
  </select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'attendance-status-select',

  props: ['value'],

  computed: {
    ...mapState('initialStates', ['meta'])
  },

  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
