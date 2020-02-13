import { required, email } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$anyError || isEqual(this.params, this.targetUser)) return true
      return false
    }
  },

  validations: {
    params: {
      name: { required },
      email: { required, email }
    }
  }
}
