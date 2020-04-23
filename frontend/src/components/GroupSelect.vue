<template>
  <select
    class="form-select"
    @change="updateValue($event)"
  >
    <slot name="placeholder" />
    <option
      v-for="group in groups"
      :key="group.id"
      :value="group.id"
    >
      {{ group.name }}
    </option>
  </select>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'GroupSelect',

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...mapState('groups', ['groups'])
  },

  created() {
    this.getGroups()
  },

  methods: {
    ...mapActions('groups', ['getGroups']),

    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
