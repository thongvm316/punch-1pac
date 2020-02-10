<template>
  <select
    class="form-select"
    :disabled="isFilterDisabled"
    @change="updateValue($event)"
  >
    <slot name="placeholder" />
    <option
      v-for="(status, key) in meta.attendance_statuses"
      :key="key"
      :value="status"
    >
      {{ $t(`meta.attendance_statuses.${status}`) }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AttendanceStatusSelect',

  props: {
    value: {
      type: String,
      default: ''
    },

    isFilterDisabled: {
      type: Boolean,
      default: false
    }
  },

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
