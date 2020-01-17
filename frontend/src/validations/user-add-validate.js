import { required, email } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$anyError) return true
      let emtyParams = {
        name: '',
        email: '',
        role: 'member',
        group_id: ''
      }
      if (isEqual(this.params, emtyParams)) return true

      return false
    }
  },

  validations: {
    params: {
      name: { required },
      email: {
        required,
        email
      },
      group_id: { required }
    }
  }
}
