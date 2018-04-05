import User from './user'
import Page from './page'

const classes = {
  User,
  Page
}

export default function authorization (model, currentUser, record) {
  if (!classes[model]) throw new Error(`${model} class in authorization is not existed`)
  return new classes[model](currentUser, record)
}
