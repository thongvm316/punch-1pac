import Modal from '../components/Modal.vue'
import { mapActions } from 'vuex'

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
    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    toggleAddModal (callback) {
      if (callback) callback()
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal (callback) {
      if (callback) callback()
      this.isEditModalOpen = !this.isEditModalOpen
    },

    submitAddModal (params, callback, msg = '') {
      callback(params).then(response => {
        this.isAddModalOpen = false
        if (msg) this.setFlashMsg(msg)
      })
    },

    saveEditModal (params, callback, msg = '') {
      callback(params).then(response => {
        this.isEditModalOpen = false
        if (msg) this.setFlashMsg(msg)
      })
    }
  }
}
