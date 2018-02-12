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
          :class="{ 'text-bold-600': !announcement.readed }"
          :to="`/announcements/${announcement.id}`"
          v-for="announcement in announcements"
          :key="announcement.id">
          <td>{{ announcement.title }}</td>
          <td>{{ announcement.status }}</td>
          <td>{{ announcement.created_at | datetime_normal }}</td>
        </router-link>
      </tbody>
    </table>
    <pagination action="getAnnouncements" namespace="announcements" v-if="pager.total_pages > 1"/>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    MainLayout,
    Pagination
  },

  computed: {
    ...mapState('announcements', [
      'pager',
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
  }
}
</script>
