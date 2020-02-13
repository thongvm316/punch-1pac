import { required } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.request) {
        flag = this.day === this.request.attendance_day && isEqual(this.params, this.request)
      } else if (this.attendance) {
        let emtyParams = {
          attendance_day: this.attendance.day,
          attended_at: '',
          left_at: '',
          reason: ''
        }

        flag = (this.day === '' || this.day === this.attendance.day) && isEqual(this.params, emtyParams)
      }

      return flag
    }
  },

  validations: {
    day: { required },
    params: {
      attended_at: { required },
      left_at: { required },
      reason: { required }
    }
  }
}
