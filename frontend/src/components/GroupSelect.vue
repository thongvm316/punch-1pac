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
import axios from 'axios'

export default {
  name: 'GroupSelect',

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      groups: []
    }
  },

  created() {
    this.fetchAllGroups()
  },

  methods: {
    fetchAllGroups() {
      axios
        .get('/groups')
        .then(response => {
          this.groups = response.data
        })
        .catch(error => {
          throw error
        })
    },

    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
