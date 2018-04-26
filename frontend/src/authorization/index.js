import User from './user'
import Page from './page'
import Group from './group'

const classes = {
  User,
  Page,
  Group
}

export default function authorization (model, currentUser, record) {
  if (!classes[model]) throw new Error(`${model} class in authorization is not existed`)
  return new classes[model](currentUser, record)
}
