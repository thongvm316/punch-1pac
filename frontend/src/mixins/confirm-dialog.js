const ConfirmDialog = () => import('../components/ConfirmDialog.vue')

export default {
  data() {
    return {
      isOpenConfirmDialog: false,
      selectedObject: {}
    }
  },

  components: {
    ConfirmDialog
  },

  methods: {
    openConfirmDialog(object = {}) {
      this.selectedObject = object
      this.isOpenConfirmDialog = !this.isOpenConfirmDialog
    }
  }
}
