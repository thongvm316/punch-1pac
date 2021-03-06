import Abstract from './abstract'

export default class Group extends Abstract {
  canCreate() {
    if (this.currentUser.owner || this.currentUser.role === 'superadmin') return true
    return false
  }

  canEdit() {
    if (this.currentUser.owner || this.currentUser.role === 'superadmin') return true
    if (this.currentUser.role === 'admin' && this.currentUser.groups.find(group => group.id === parseInt(this.record))) return true
    return false
  }

  canView() {
    return this.canEdit()
  }

  canAddUser() {
    return this.canEdit()
  }

  canRemoveUser() {
    return this.canEdit()
  }

  canDelete() {
    return this.canCreate()
  }
}
