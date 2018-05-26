import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('initialStates', ['currentUser'])
  }
}
