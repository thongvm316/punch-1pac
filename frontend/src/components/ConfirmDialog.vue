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
      <div class="modal-footer">
        <button type="button" class="btn btn-error" @click="confirm">Yes</button>
        <button type="button" class="btn" @click="toggle">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirm-dialog',

  props: ['title', 'modalOpen', 'deleteObject', 'objectId'],

  data () {
    return {
      open: this.modalOpen
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
      this.$emit('update:modalOpen', this.open)
    },

    confirm () {
      this.deleteObject(this.objectId).then(() => {
        this.open = false
        this.$emit('update:modalOpen', this.open)
      })
    }
  },

  watch: {
    modalOpen () {
      this.open = this.modalOpen
    }
  }
}
</script>
