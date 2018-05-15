import Abstract from './abstract'

export default class Page extends Abstract {
  canViewGroups () {
    return this.currentUser.role === 'superadmin' || this.currentUser.role === 'admin'
  }

  canViewCompanySettings () {
    return this.canViewGroups()
  }

  canViewPendingBlock () {
    return this.canViewGroups()
  }
}
