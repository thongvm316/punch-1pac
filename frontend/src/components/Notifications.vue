<template>
  <div class="dropdown mr-5" :class="{ active: isDropdownActive }" @click="toggleDropdown" ref="dropdownMenu">
      <span class="notification" :class="{ badge: unreadNotificationsCount }" :data-badge="displayNotificationsCount">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
        d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
        2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
        0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
    </span>
    <div class="box notification-dropdown">
      <h4>{{ $t('header.notifications') }}</h4>
      <ul v-if="notifications.length > 0">
        <li v-for="notification in notifications" :key="notification.id">
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
      <p class="no-notification-msg" v-else>
        {{ $t('header.noNotificationMsg') }}
      </p>
    </div>
  </div>
</template>

<script>
import dropdown from '../mixins/dropdown'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'notifications',
  mixins: [dropdown],

  computed: {
    ...mapState('notifications', [
      'unreadNotificationsCount',
      'notifications'
    ]),

    ...mapGetters('notifications', [
      'displayNotificationsCount'
    ])
  },

  methods: {
    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
      this.readNotifications(this.notifications[0].id)
    },

    ...mapActions('notifications', [
      'readNotifications',
      'getNotifications'
    ])
  },

  created () {
    this.getNotifications()
        .then(() => setInterval(this.getNotifications, 10000))
  }
}
</script>
