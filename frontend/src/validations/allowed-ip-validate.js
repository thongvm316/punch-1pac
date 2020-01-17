import { required } from 'vuelidate/lib/validators'

export default {
  computed: {
    isDisabled() {
      if (this.$v.params.$error) return true
      let flag = false
      flag = this.targetIp ? this.params === this.targetIp.ip_address : this.params === ''

      return flag
    }
  },

  validations: {
    params: {
      required,
      isValid(params) {
        const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
        return ipRegex.test(params)
      }
    }
  }
}
