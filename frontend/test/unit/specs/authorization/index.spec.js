import { currUser, targetUser } from '../../supports/fixtures/user'
import User from '@/authorization/user'
import Page from '@/authorization/page'
import Group from '@/authorization/group'
import authorization from '@/authorization'

let currentUser = { ...currUser() }
let record = { ...targetUser() }

describe('when model is not exists', () => {
  it('should throw error', () => {
    expect(() => {
      expect(authorization('Admin', currentUser, record))
    }).toThrowError('Admin class in authorization is not')
  })

  it('should be instance of model', () => {
    expect(authorization('User', currentUser, record)).toBeInstanceOf(User)
    expect(authorization('Page', currentUser, record)).toBeInstanceOf(Page)
    expect(authorization('Group', currentUser, record)).toBeInstanceOf(Group)
  })
})
