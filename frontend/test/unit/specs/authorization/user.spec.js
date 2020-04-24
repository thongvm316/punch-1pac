import User from '@/authorization/user'
import { currUser, targetUser } from '../../supports/fixtures/user'

let currentUser
let record
let user

beforeEach(() => {
  currentUser = { ...currUser() }
  record = { ...targetUser() }
})

describe('when canEdit', () => {
  describe('when currentUser is owner', () => {
    it('should return true', () => {
      currentUser.owner = true
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(true)
    })
  })

  describe('when currentUser is superadmin', () => {
    beforeEach(() => { currentUser.role = 'superadmin' })

    it('should return true', () => {
      record.owner = false
      record.role === 'member'
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(true)
    })

    it('should return false when record is owner', () => {
      record.owner = true
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(false)
    })

    it('should return false when record has role superadmin', () => {
      record.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(false)
    })
  })

  describe('when currentUser is admin', () => {
    beforeEach(() => { currentUser.role = 'admin' })

    it('should return true when record is member', () => {
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(true)
    })

    it('should return false when record is admin', () => {
      record.role = 'admin'
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(false)
    })

    it('should return false when record is superadmin', () => {
      record.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(false)
    })
  })

  describe('when currentUser is record', () => {
    it('should return true', () => {
      record = { ...currentUser }
      user = new User(currentUser, record)

      expect(user.canEdit()).toBe(true)
    })
  })
})

describe('when canEditRole', () => {
  describe('when currentUser is superadmin', () => {
    beforeEach(() => { currentUser.role = 'superadmin' })

    it('should return true', () => {
      user = new User(currentUser, record)

      expect(user.canEditRole()).toBe(true)
    })

    it('should return false when record is superadmin', () => {
      record.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canEditRole()).toBe(false)
    })
  })
})

describe('when canDelete', () => {
  describe('when record is owner', () => {
    it('should return false', () => {
      record.owner = true
      user = new User(currentUser, record)

      expect(user.canDelete()).toBe(false)
    })
  })

  describe('when currentUser is owner', () => {
    it('should return false', () => {
      currentUser.owner = true
      user = new User(currentUser, record)

      expect(user.canDelete()).toBe(true)
    })
  })

  describe('when currentUser is superadmin', () => {
    it('should return false', () => {
      currentUser.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canDelete()).toBe(true)
    })
  })

  describe('when currentUser is admin', () => {
    beforeEach(() => { currentUser.role = 'admin' })

    it('should return true', () => {
      record.role = 'member'
      user = new User(currentUser, record)

      expect(user.canDelete()).toBe(true)
    })

    it('should return false when record is admin', () => {
      record.role = 'admin'
      user = new User(currentUser, record)

      expect(user.canDelete()).toBe(false)
    })

    it('should return false when record is admin', () => {
      record.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canDelete()).toBe(false)
    })
  })
})

describe('when canLockUnlockAccount', () => {
  describe('when record is owner', () => {
    it('should return false', () => {
      record.owner = true
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(false)
    })
  })

  describe('when currentUser is owner', () => {
    it('should return true', () => {
      currentUser.owner = true
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(true)
    })
  })

  describe('when currentUser is superadmin', () => {
    beforeEach(() => { currentUser.role = 'superadmin' })

    it('should return true', () => {
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(true)
    })

    it('should return false when record is superadmin', () => {
      record.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(false)
    })
  })

  describe('when currentUser is admin', () => {
    beforeEach(() => { currentUser.role = 'admin' })

    it('should return true', () => {
      record.role = 'member'
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(true)
    })

    it('should return false when record is admin', () => {
      record.role = 'admin'
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(false)
    })

    it('should return false when record is admin', () => {
      record.role = 'superadmin'
      user = new User(currentUser, record)

      expect(user.canLockUnlockAccount()).toBe(false)
    })
  })
})
