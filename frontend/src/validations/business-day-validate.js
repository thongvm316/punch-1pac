import { required } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.targetBusinessDay) {
        flag = isEqual(this.params, this.targetBusinessDay)
      } else {
        const emptyParams = {
          weekday: '',
          morning_started_at: '08:00',
          morning_ended_at: '12:00',
          afternoon_started_at: '13:30',
          afternoon_ended_at: '17:30'
        }

        flag = isEqual(this.params, emptyParams)
      }
      return flag
    }
  },

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
