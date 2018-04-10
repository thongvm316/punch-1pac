<template>
  <main-layout :title="$t('notifications.title')">
    <div class="box notifications">
      <ul>
        <li v-for="notification in notifications">
          <div class="tile tile-centered tile-activity">
            <div class="tile-icon">
              <img :src="notification.user.avatar_url" class="avatar avatar-md" :alt="notification.user.name">
            </div>
            <div class="tile-content">
              <p class="tile-title" v-html="$t(`activity.${notification.activitable_type.toLowerCase()}.${notification.kind}`, { name: notification.user.name })"></p>
              <p class="tile-subtitle">{{ notification.created_at | moment_activity }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <pagination action="getNotifications" namespace="notifications" v-if="pager.total_pages > 1"/>
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
    ...mapState('notifications', [
      'pager',
      'notifications'
    ])
  },

  methods: {
    ...mapActions('notifications', [
      'getNotifications'
    ])
  },

  created () {
    this.getNotifications()
  }
}
</script>
