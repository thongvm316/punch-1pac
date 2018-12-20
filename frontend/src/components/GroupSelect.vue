<template>
  <select class="form-select" @change="updateValue($event)">
    <slot name="placeholder"></slot>
    <option :value="group.id" v-for="group in groups" :key="group.id">{{ group.name }}</option>
  </select>
</template>

<script>
import axios from 'axios'

export default {
  name: 'group-select',

  props: ['value'],

  data() {
    return {
      groups: []
    }
  },

  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  },

  created() {
    axios
      .get('/groups')
      .then(response => {
        this.groups = response.data
      })
      .catch(error => {
        throw error
      })
  }
}
</script>
