import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      let emptyParams = {
        current_password: '',
        password: '',
        password_confirmation: ''
      }

      if (this.$v.updateParams.$anyError || isEqual(this.updateParams, emptyParams)) return true
      return false
    }
  },

  validations: {
    updateParams: {
      current_password: { required },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(32)
      },
      password_confirmation: {
        sameAsPassword: sameAs('password')
      }
    }
  }
}
