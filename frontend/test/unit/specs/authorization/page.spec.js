import Page from '@/authorization/page'
import { currUser } from './support/user.js'

let currentUser = { ...currUser() }
let page

describe('when currentUser is superadmin', () => {
  it('should return true', () => {
    currentUser.role = 'superadmin'
    page = new Page(currentUser)

    expect(page.canViewGroups()).toBe(true)
    expect(page.canViewCompanySettings()).toBe(true)
    expect(page.canViewPendingBlock()).toBe(true)
  })
})

describe('when currentUser is admin', () => {
  it('should return true', () => {
    currentUser.role = 'admin'
    page = new Page(currentUser)

    expect(page.canViewGroups()).toBe(true)
    expect(page.canViewCompanySettings()).toBe(true)
    expect(page.canViewPendingBlock()).toBe(true)
  })
})
