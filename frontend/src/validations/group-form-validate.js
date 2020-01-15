import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    params: {
      name: { required }
    }
  }
}
