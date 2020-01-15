import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  validations: {
    updateParams: {
      current_password: { required },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(32)
      },
      password_confirmation: {
        sameAsPassword: sameAs('password')
      }
    }
  }
}
