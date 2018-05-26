import Abstract from './abstract'

export default class User extends Abstract {
  canEdit() {
    if (this.currentUser.owner) return true
    if (this.currentUser.role === 'superadmin' && !this.record.owner) return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    if (this.currentUser.id === this.record.id) return true
    return false
  }

  canDelete() {
    if (this.record.owner) return false
    if (this.currentUser.owner) return true
    if (this.currentUser.role === 'superadmin') return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    return false
  }

  canActivate() {
    if (this.record.owner) return false
    if (this.currentUser.owner) return true
    if (this.currentUser.role === 'superadmin') return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    return false
  }

  canDeactivate() {
    if (this.record.owner) return false
    if (this.currentUser.owner) return true
    if (this.currentUser.role === 'superadmin') return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    return false
  }
}
