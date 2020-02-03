<template>
  <div
    class="modal"
    :class="{ active: open }"
  >
    <span
      class="modal-overlay"
      @click="toggle"
    />
    <div class="modal-container">
      <div class="modal-header">
        <span
          class="btn btn-clear float-right"
          @click="toggle"
        />
        <h3 class="modal-title">
          {{ title }}
        </h3>
      </div>
      <div class="modal-body">
        <div class="content">
          <slot />
        </div>
      </div>
      <div class="modal-footer">
        <slot name="confirmBtn">
          <button
            type="button"
            class="btn btn-error"
            @click="confirm"
          >
            {{ $t('confirmDialog.yes') }}
          </button>
        </slot>
        <button
          type="button"
          class="btn"
          @click="toggle"
        >
          {{ $t('confirmDialog.no') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: {
    title: {
      type: String,
      required: true
    },
    modalOpen: {
      type: Boolean,
      required: true
    },
    deleteObject: Function,
    objectId: Number
  },

  data() {
    return {
      open: this.modalOpen
    }
  },

  watch: {
    modalOpen() {
      this.open = this.modalOpen
    }
  },

  methods: {
    toggle() {
      this.open = !this.open
      this.$emit('update:modalOpen', this.open)
    },

    confirm() {
      this.deleteObject(this.objectId).then(() => {
        this.open = false
        this.$emit('update:modalOpen', this.open)
      })
    }
  }
}
</script>
