export const error422 = () => {
  return {
    response: {
      status: 422,
      data: {
        message: 'Unprocessable Entity',
        errors: {
          weekday: [ 'can\'t be blank' ]
        }
      }
    }
  }
}
