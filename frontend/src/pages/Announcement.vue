<template>
  <main-layout :title="announcement.title">
    <p>{{ announcement.created_at | datetime_normal }} - {{ announcement.status }}</p>
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
    ...mapState('announcement', [
      'announcement'
    ])
  },

  methods: {
    fetch () {
      this.getAnnouncement(this.$route.params.id)
    },

    ...mapActions('announcement', [
      'getAnnouncement'
    ])
  },

  created () {
    this.fetch()
  },

  watch: {
    '$route': 'fetch'
  }
}
</script>
