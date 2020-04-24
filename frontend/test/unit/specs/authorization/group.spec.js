import Group from '@/authorization/group'
import { currUser } from '../../supports/fixtures/user'

let group
let currentUser

beforeEach(() => {
  currentUser = { ...currUser() }
})

describe('when canCreate', () => {
  describe('when currentUser is owner', () => {
    it('should return true', () => {
      currentUser.owner = true
      group = new Group(currentUser)

      expect(group.canCreate()).toBe(true)
      expect(group.canDelete()).toBe(true)
    })
  })

  describe('when currentUser is superadmin', () => {
    it('should return true', () => {
      currentUser.role = 'superadmin'
      group = new Group(currentUser)

      expect(group.canCreate()).toBe(true)
      expect(group.canDelete()).toBe(true)
    })
  })
})

describe('when canEdit', () => {
  describe('when currentUser is owner', () => {
    it('should return true', () => {
      currentUser.owner = true
      group = new Group(currentUser)

      expect(group.canEdit()).toBe(true)
      expect(group.canView()).toBe(true)
      expect(group.canAddUser()).toBe(true)
      expect(group.canRemoveUser()).toBe(true)
    })
  })

  describe('when currentUser is superadmin', () => {
    it('should return true', () => {
      currentUser.role = 'superadmin'
      group = new Group(currentUser)

      expect(group.canEdit()).toBe(true)
      expect(group.canView()).toBe(true)
      expect(group.canAddUser()).toBe(true)
      expect(group.canRemoveUser()).toBe(true)
    })
  })

  describe('when currentUser is admin', () => {
    it('should return true', () => {
      group = new Group(currentUser, 0)

      expect(group.canEdit()).toBe(true)
      expect(group.canView()).toBe(true)
      expect(group.canAddUser()).toBe(true)
      expect(group.canRemoveUser()).toBe(true)
    })

    it('should return false when currentUser not in group', () => {
      group = new Group(currentUser, 1)

      expect(group.canEdit()).toBe(false)
      expect(group.canView()).toBe(false)
      expect(group.canAddUser()).toBe(false)
      expect(group.canRemoveUser()).toBe(false)
    })
  })
})
