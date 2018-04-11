<template>
  <div>
    <div class="toast toast-dark text-center mt-2"
      :class="{ 'toast-warning': announcement.status === 'urgent' }"
      v-for="announcement in headerAnnouncements">
      <button class="btn btn-clear float-right" @click="readAnnouncement(announcement.id)"></button>
      {{ announcement.content }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'announcements',

  computed: {
    ...mapState('announcements', [
      'headerAnnouncements'
    ])
  },

  methods: {
    ...mapActions('announcements', [
      'readAnnouncement'
    ])
  }
}
</script>
