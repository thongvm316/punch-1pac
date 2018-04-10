const MEMBER_ACCESSABLE_PAGES = [
  'dashboard',
  'notifications',
  'attendances',
  'requests',
  'user-settings-profile',
  'user-settings-password',
  'user-settings-security'
]

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.currentUser.role === 'superadmin' || vm.currentUser.role === 'admin') {
        next()
      } else if (vm.currentUser.role === 'member' && MEMBER_ACCESSABLE_PAGES.includes(vm.$route.name)) {
        next()
      } else {
        next({name: 'error-404'})
      }
    })
  }
}
