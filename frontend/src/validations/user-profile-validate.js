import { required, email } from 'vuelidate/lib/validators'

export default {
  validations: {
    params: {
      name: { required },
      email: { required, email }
    }
  }
}
