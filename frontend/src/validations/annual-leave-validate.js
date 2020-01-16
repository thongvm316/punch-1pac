import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    params: {
      attendance_day: { required },
      reason: { required }
    }
  }
}
