import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],

  validations: {
    params: {
      required,
      isValid(params) {
        const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
        return ipRegex.test(params)
      }
    }
  }
}
