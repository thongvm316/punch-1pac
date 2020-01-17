import { required } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisable() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.request) {
        flag = isEqual(this.params, this.request)
      } else {
        flag = isEqual(this.params, { attendance_day: '', reason: '' })
      }

      return flag
    }
  },

  validations: {
    params: {
      attendance_day: { required },
      reason: { required }
    }
  }
}
