<template>
  <div>
    <div
      v-for="announcement in headerAnnouncements"
      :key="announcement.id"
      class="toast text-center mt-2"
      :class="[{ 'toast-warning': announcement.status === 'urgent' }, { 'toast-success': announcement.status === 'normal' }]"
    >
      <button
        class="btn btn-clear float-right"
        @click="readAnnouncement(announcement.id)"
      />
      {{ announcement.content }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Announcements',

  computed: {
    ...mapState('announcements', ['headerAnnouncements'])
  },

  methods: {
    ...mapActions('announcements', ['readAnnouncement'])
  }
}
</script>
