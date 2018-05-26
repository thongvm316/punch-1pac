const MEMBER_ACCESSABLE_PAGES = ['dashboard', 'notifications', 'attendances', 'requests', 'user-settings-profile', 'user-settings-password', 'user-settings-security']

const GROUP_PAGES = ['group', 'group-attendances', 'group-requests', 'group-report']

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.currentUser.owner || vm.currentUser.role === 'superadmin') {
        next()
      } else if (vm.currentUser.role === 'admin') {
        if (GROUP_PAGES.includes(vm.$route.name) && !vm.$auth('Group', vm.currentUser, vm.$route.params.id).canView()) {
          next({ name: 'error-404' })
          return
        }
        next()
      } else if (vm.currentUser.role === 'member' && MEMBER_ACCESSABLE_PAGES.includes(vm.$route.name)) {
        next()
      } else {
        next({ name: 'error-404' })
      }
    })
  }
}
