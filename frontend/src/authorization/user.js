import Abstract from './abstract'

export default class User extends Abstract {
  canEdit() {
    if (this.currentUser.owner) return true
    if (this.currentUser.role === 'superadmin' && (!this.record.owner && this.record.role !== 'superadmin')) return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    if (this.currentUser.id === this.record.id) return true
    return false
  }

  canEditRole() {
    if (this.currentUser.role === 'superadmin' && this.record.role !== 'superadmin') return true
    return false
  }

  canDelete() {
    if (this.record.owner) return false
    if (this.currentUser.owner || this.currentUser.role === 'superadmin') return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    return false
  }

  canLockUnlockAccount() {
    if (this.record.owner) return false
    if (this.currentUser.owner) return true
    if (this.currentUser.role === 'superadmin' && this.record.role !== 'superadmin') return true
    if (this.currentUser.role === 'admin' && this.record.role === 'member') return true
    return false
  }
}
