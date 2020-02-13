import { SET_FLASH_MESSAGE } from '../store/mutation-types'
import { mapMutations } from 'vuex'
const Modal = () => import('../components/Modal.vue')

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
    ...mapMutations('flash', [SET_FLASH_MESSAGE]),

    toggleAddModal() {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal() {
      this.isEditModalOpen = !this.isEditModalOpen
    },

    submitAddModal(params, callback, msg = '') {
      callback(params).then(response => {
        this.isAddModalOpen = false
        if (msg) this[SET_FLASH_MESSAGE]({ message: msg })
      })
    },

    saveEditModal(params, callback, msg = '') {
      callback(params).then(response => {
        this.isEditModalOpen = false
        if (msg) this[SET_FLASH_MESSAGE]({ message: msg })
      })
    }
  }
}
