<template>
  <main-layout title="Announcements">
    <table class="table table-hover mt-5 bg-light">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Sent at</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          tag="tr"
          :class="{ unread: announcement.unread }"
          :to="`/announcements/${announcement.id}`"
          v-for="announcement in announcements"
          :key="announcement.id">
          <td>{{ announcement.title }}</td>
          <td>{{ announcement.status }}</td>
          <td>{{ announcement.created_at | datetime_normal }}</td>
        </router-link>
      </tbody>
    </table>
    <pagination action="announcements/getAnnouncements" :pager="pager" v-if="pager.total_pages > 1"/>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import pagination from '../mixins/pagination'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [pagination],

  components: {
    MainLayout
  },

  computed: {
    ...mapState('announcements', [
      'announcements'
    ])
  },

  methods: {
    ...mapActions('announcements', [
      'getAnnouncements'
    ])
  },

  created () {
    this.getAnnouncements()
        .then((response) => { this.pager = response.data.meta })
  }
}
</script>
