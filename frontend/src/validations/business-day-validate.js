import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    params: {
      weekday: { required },
      morning_started_at: { required },
      morning_ended_at: { required },
      afternoon_started_at: { required },
      afternoon_ended_at: { required }
    }
  }
}
