<template>
  <main-layout :title="announcement.title">
    <p>{{ announcement.created_at | moment_llll }} - {{ announcement.status }}</p>
    <p>{{ announcement.content }}</p>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    MainLayout
  },

  computed: {
    ...mapState('announcements', [
      'announcement'
    ])
  },

  methods: {
    ...mapActions('announcements', [
      'readAnnouncement',
      'getAnnouncement'
    ])
  },

  created () {
    this.getAnnouncement(this.$route.params.id)
        .then(response => { if (!response.data.readed) this.readAnnouncement(response.data.id) })
  },

  watch: {
    '$route': function (val) {
      this.getAnnouncement(this.$route.params.id)
          .then(response => { if (!response.data.readed) this.readAnnouncement(response.data.id) })
    }
  }
}
</script>
