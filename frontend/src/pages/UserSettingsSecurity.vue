<template>
  <div>
    <h2>{{ $t('user.security.title') }}</h2>
    <table class="table bg-light mt-5">
      <thead>
        <tr>
          <th>{{ $t('tableHeader.client') }}</th>
          <th>{{ $t('tableHeader.os') }}</th>
          <th>{{ $t('tableHeader.ip') }}</th>
          <th>{{ $t('tableHeader.lastSignedIn') }}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p-ico-desktop
              v-if="currentSession.device_type === 'desktop'"
            />

            <p-ico-smartphone
              v-if="currentSession.device_type === 'smartphone'"
            />

            <p-ico-tablet
              v-if="currentSession.device_type === 'tablet'"
            />
            {{ currentSession.client }}
          </td>
          <td>{{ currentSession.os }}</td>
          <td>{{ currentSession.ip_address }}</td>
          <td>{{ $t('user.security.currentSession') }}</td>
          <td />
        </tr>
        <tr
          v-for="session in sessions"
          :key="session.id"
        >
          <td>
            <p-ico-desktop
              v-if="session.device_type === 'desktop'"
            />

            <p-ico-smartphone
              v-if="session.device_type === 'smartphone'"
            />

            <p-ico-tablet
              v-if="session.device_type === 'tablet'"
            />
            {{ session.client }}
          </td>
          <td>{{ session.os }}</td>
          <td>{{ session.ip_address }}</td>
          <td>{{ session.updated_at | moment_llll }}</td>
          <td>
            <button
              type="button"
              class="btn btn-error"
              @click="deleteSession(session.id)"
            >
              {{ $t('button.common.revoke') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PIcoDesktop from '@/punch-ui/punch-icons/PIcoDesktop'
import PIcoTablet from '@/punch-ui/punch-icons/PIcoTablet'
import PIcoSmartphone from '@/punch-ui/punch-icons/PIcoSmartphone'

export default {
  components: {
    PIcoDesktop,
    PIcoTablet,
    PIcoSmartphone
  },

  data() {
    return {
      isInfoOpen: false
    }
  },

  computed: {
    ...mapState('initialStates', ['currentUser']),

    ...mapState('userSessions', ['sessions', 'currentSession'])
  },

  created() {
    this.fetchSessions()
  },

  methods: {
    ...mapActions('userSessions', ['fetchSessions', 'deleteSession'])
  }
}
</script>
