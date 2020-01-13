<template>
  <div class="modal" :class="{ active: open }">
    <span class="modal-overlay" @click="toggle"></span>
    <div class="modal-container">
      <div class="modal-header">
        <span class="btn btn-clear float-right" @click="toggle"></span>
        <h3 class="modal-title">{{ titleModal }}</h3>
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

  props: {
    title: {
      type: String,
      required: true
    },

    modalOpen: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      open: this.modalOpen,
      titleModal: this.title
    }
  },

  methods: {
    toggle() {
      this.open = !this.open
      this.$emit('update:modalOpen', this.open)
    }
  },

  watch: {
    modalOpen() {
      this.open = this.modalOpen
    },

    title() {
      this.titleModal = this.title
    }
  }
}
</script>
