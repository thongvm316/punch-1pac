<template>
  <div class="modal" :class="{ active: open }">
    <span class="modal-overlay" @click="toggle"></span>
    <div class="modal-container">
      <div class="modal-header">
        <span class="btn btn-clear float-right" @click="toggle"></span>
        <h3 class="modal-title">{{ title }}</h3>
      </div>
      <div class="modal-body">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',

  props: ['title', 'modalOpen'],

  data () {
    return {
      open: this.modalOpen
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
      this.$emit('update:modalOpen', this.open)
    }
  },

  watch: {
    modalOpen () {
      this.open = this.modalOpen
    }
  }
}
</script>
