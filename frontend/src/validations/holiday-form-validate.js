import { required } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.targetHoliday) {
        flag = isEqual(this.params, this.targetHoliday)
      } else {
        let emtyParams = {
          name: '',
          started_at: '',
          ended_at: ''
        }

        flag = isEqual(this.params, emtyParams)
      }

      return flag
    }
  },

  validations: {
    params: {
      name: { required },
      started_at: { required },
      ended_at: { required }
    }
  }
}
