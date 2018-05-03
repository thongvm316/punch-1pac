<template>
  <div>
    <div class="toast text-center mt-2"
			:class="[{ 'toast-warning': announcement.status === 'urgent' }, { 'toast-success': announcement.status === 'normal' }]"
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
      'readAnnouncement',
      'getHeaderAnnouncements'
    ])
  },

  created () {
    this.getHeaderAnnouncements()
  }
}
</script>
