import { required } from 'vuelidate/lib/validators'

export default {
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
