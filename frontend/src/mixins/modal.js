import Modal from '../components/Modal.vue'

export default {
  data () {
    return {
      isAddModalOpen: false,
      isEditModalOpen: false
    }
  },

  components: {
    Modal
  },

  methods: {
    toggleAddModal (callback) {
      if (callback) callback()
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal (callback) {
      if (callback) callback()
      this.isEditModalOpen = !this.isEditModalOpen
    },

    submitAddModal (params, callback) {
      callback(params).then(response => { this.isAddModalOpen = false })
    },

    saveEditModal (params, callback) {
      callback(params).then(response => { this.isEditModalOpen = false })
    }
  }
}
