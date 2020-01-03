import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('flash', ['setFlashMsg']),

    handleSuccess(data) {
      this.setFlashMsg({ message: data.message })
      data.emitType && this.$emit(data.emitType)
      this.isDisable = false
    }
  }
}
