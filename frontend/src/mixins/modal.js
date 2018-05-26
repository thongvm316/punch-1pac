import Modal from '../components/Modal.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isAddModalOpen: false,
      isEditModalOpen: false
    }
  },

  components: {
    Modal
  },

  methods: {
    ...mapActions('flash', ['setFlashMsg']),

    toggleAddModal() {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal() {
      this.isEditModalOpen = !this.isEditModalOpen
    },

    submitAddModal(params, callback, msg = '') {
      callback(params).then(response => {
        this.isAddModalOpen = false
        if (msg) this.setFlashMsg({ message: msg })
      })
    },

    saveEditModal(params, callback, msg = '') {
      callback(params).then(response => {
        this.isEditModalOpen = false
        if (msg) this.setFlashMsg({ message: msg })
      })
    }
  }
}
