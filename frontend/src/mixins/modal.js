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
    toggleAddModal () {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal () {
      this.isEditModalOpen = !this.isEditModalOpen
    }
  }
}
