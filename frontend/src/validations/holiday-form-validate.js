import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    params: {
      name: { required },
      started_at: { required },
      ended_at: { required }
    }
  }
}
