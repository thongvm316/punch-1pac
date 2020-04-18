export const userPasswordError = () => ({
  status: 422,
  data: {
    message: 'Unprocessable Entity',
    errors: {
      current_password: [ 'is incorrect' ]
    }
  }
})
