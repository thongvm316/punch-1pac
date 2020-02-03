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
            <svg
              v-if="currentSession.device_type === 'desktop'"
              height="48"
              version="1.1"
              viewBox="0 0 16 16"
              width="48"
              stroke="currentColor"
            ><path
              fill-rule="evenodd"
              d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"
            /></svg>
            <svg
              v-if="currentSession.device_type === 'smartphone'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
class="feather feather-smartphone"
            ><rect
              x="5"
              y="2"
              width="14"
              height="20"
              rx="2"
              ry="2"
            /><line
              x1="12"
              y1="18"
              x2="12"
              y2="18"
            /></svg>
            <svg
              v-if="currentSession.device_type === 'tablet'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
class="feather feather-tablet"
            ><rect
              x="4"
              y="2"
              width="16"
              height="20"
              rx="2"
              ry="2"
              transform="rotate(180 12 12)"
            /><line
              x1="12"
              y1="18"
              x2="12"
              y2="18"
            /></svg>
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
            <svg
              v-if="session.device_type === 'desktop'"
              height="48"
              version="1.1"
              viewBox="0 0 16 16"
              width="48"
              stroke="currentColor"
            ><path
              fill-rule="evenodd"
              d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"
            /></svg>
            <svg
              v-if="session.device_type === 'smartphone'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
class="feather feather-smartphone"
            ><rect
              x="5"
              y="2"
              width="14"
              height="20"
              rx="2"
              ry="2"
            /><line
              x1="12"
              y1="18"
              x2="12"
              y2="18"
            /></svg>
            <svg
              v-if="session.device_type === 'tablet'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
class="feather feather-tablet"
            ><rect
              x="4"
              y="2"
              width="16"
              height="20"
              rx="2"
              ry="2"
              transform="rotate(180 12 12)"
            /><line
              x1="12"
              y1="18"
              x2="12"
              y2="18"
            /></svg>
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

export default {
  data() {
    return {
      isInfoOpen: false
    }
  },

  methods: {
    ...mapActions('userSessions', ['fetchSessions', 'deleteSession'])
  },

  computed: {
    ...mapState('initialStates', ['currentUser']),

    ...mapState('userSessions', ['sessions', 'currentSession'])
  },

  created() {
    this.fetchSessions()
  }
}
</script>
