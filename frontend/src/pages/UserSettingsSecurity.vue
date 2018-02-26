<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" :subtitle="$t('subtitle.security')">
    <table class="table bg-light mt-5">
      <thead>
        <tr>
          <th>{{ $t('tableHeader.client') }}</th>
          <th>{{ $t('tableHeader.ip') }}</th>
          <th>{{ $t('tableHeader.lastSignedIn') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in sessions">
          <td>
            <svg height="48" version="1.1" viewBox="0 0 16 16" width="48"><path fill-rule="evenodd" d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"></path></svg>
            {{ session.client }}
          </td>
          <td>{{ session.ip_address }}</td>
          <td>{{ session.updated_at | datetime_normal }}</td>
          <td><button
                type="button"
                class="btn btn-error"
                @click="deleteSession(session.id)">{{ $t('button.revoke') }}</button></td>
        </tr>
      </tbody>
    </table>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      isInfoOpen: false
    }
  },
  components: {
    SettingLayout
  },
  methods: {
    ...mapActions('userSessions', [
      'fetchSessions',
      'deleteSession'
    ])
  },
  computed: {
    ...mapState('userSessions', [
      'sessions'
    ])
  },
  created () {
    this.fetchSessions()
  }
}
</script>
