<template>
  <div>
    <div class="dropdown mr-5" :class="{ active: isDropdownActive }" @click="toggleDropdown" ref="dropdownMenu">
        <span class="notification" :class="{ badge: unreadNotificationsCount }" :data-badge="displayNotificationsCount">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
          d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
          2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
          0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
      </span>
      <div class="box notifications notification-dropdown">
        <div class="notification-header">
          <h4>{{ $t('header.notifications') }}</h4>
          <router-link to="/notifications">{{ $t('header.seeAll') }}</router-link>
        </div>
        <ul v-if="headerNotifications.length > 0">
          <li v-for="notification in headerNotifications" :key="notification.id" @click="openRequestModal(notification)" v-if="notification.activitable">
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
    <modal :title="$t('header.notifications')" :modal-open.sync="isAddModalOpen" v-if="['create', 'update'].includes(notification.kind) && notification.activitable_type === 'Request' && !['approved', 'rejected'].includes(notification.activitable.status)">
      <p>{{ notification.activitable.reason }}</p>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btn-submit" @click="submitAddModal(notification.activitable_id, approveRequest, $t('messages.request.approvedSuccess'))">{{ $t('notifications.btn.approve') }}</button>
        <button type="button" class="btn btn-success btn-error mt-4" @click="submitAddModal(notification.activitable_id, rejectRequest, $t('messages.request.rejectedSuccess'))">{{ $t('notifications.btn.reject') }}</button>
      </div>
    </modal>
  </div>
</template>

<script>
import dropdown from '../mixins/dropdown'
import modal from '../mixins/modal'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { SET_INTERVAL_FETCH_NOTIFICATIONS } from '../store/mutation-types'

export default {
  name: 'notifications',
  mixins: [dropdown, modal],

  data () {
    return {
      notification: ''
    }
  },

  computed: {
    ...mapState('notifications', [
      'hasIntervalFetchNotifications',
      'unreadNotificationsCount',
      'headerNotifications'
    ]),

    ...mapGetters('notifications', [
      'displayNotificationsCount'
    ])
  },

  methods: {
    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
      if (this.isDropdownActive && this.headerNotifications[0]) this.readNotifications(this.headerNotifications[0].id)
    },

    ...mapActions('notifications', [
      'readNotifications',
      'getHeaderNotifications',
      'approveRequest',
      'rejectRequest'
    ]),

    ...mapMutations('notifications', [
      SET_INTERVAL_FETCH_NOTIFICATIONS
    ]),

    openRequestModal (notification) {
      this.isAddModalOpen = !this.isAddModalOpen
      this.notification = notification
    }
  },

  created () {
    if (!this.hasIntervalFetchNotifications) {
      this.getHeaderNotifications()
          .then(() => {
            this[SET_INTERVAL_FETCH_NOTIFICATIONS](setInterval(this.getHeaderNotifications, 10000))
          })
    }
  }
}
</script>
