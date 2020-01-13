export const targetUser = () => {
  return {
    role: 'member',
    owner: false,
    id: 1
  }
}

export const currUser = () => {
  return {
    role: 'admin',
    owner: false,
    id: 0,
    groups: [
      {
        id: 0,
        name: 'aaa'
      }
    ]
  }
}
