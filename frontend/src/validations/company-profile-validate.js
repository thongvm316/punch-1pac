import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    params: {
      name: { required },
      country: { required },
      address: { required },
      phone_number: {
        required,
        isValid(params) {
          const phoneNum = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/
          return phoneNum.test(params)
        }
      }
    }
  }
}
