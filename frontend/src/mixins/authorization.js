import { mapState } from 'vuex'
import { ADMIN_PERMITTED } from '../utils/constants'

export default {
  computed: {
    ...mapState('initialStates', [
      'currentUser'
    ])
  },
  methods: {
    isManagers () {
      return this.currentUser && ADMIN_PERMITTED.includes(this.currentUser.role)
    }
  }
}
