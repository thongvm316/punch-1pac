<template>
  <select class="form-select" @change="updateValue($event)">
    <slot name="placeholder"></slot>
    <option :value="group.id" v-for="group in groups">{{ group.name }}</option>
  </select>
</template>

<script>
import axios from 'axios'

export default {
  name: 'group-select',

  props: {
    value: String
  },

  data() {
    return {
      groups: []
    }
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
  },

  created() {
    this.fetchAllGroups()
  }
}
</script>
