import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    day: { required },
    params: {
      attended_at: { required },
      left_at: { required },
      reason: { required }
    }
  }
}
