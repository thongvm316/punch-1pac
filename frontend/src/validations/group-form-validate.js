import { required } from 'vuelidate/lib/validators'
import { isEqual } from 'underscore'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$anyError) return true
      let flag = false
      flag = this.targetGroup ? isEqual(this.params, this.targetGroup) : this.params.name === ''
      return flag
    }
  },

  validations: {
    params: {
      name: { required }
    }
  }
}
