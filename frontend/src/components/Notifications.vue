<template>
  <div>
    <div class="dropdown mr-5" :class="{ active: isDropdownActive }" @click="toggleDropdown" ref="dropdownMenu">
        <span class="notification" :class="{ badge: unreadNotificationsCount }" :data-badge="displayNotificationsCount">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
          d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
          2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
          0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
      </span>
      <div class="box notifications notification-dropdown triangle-top">
        <div class="notification-header">
          <h4>{{ $t('header.notifications') }}</h4>
        </div>
        <ul v-if="headerNotifications.length > 0" ref="notiList">
          <li v-for="notification in headerNotifications"
              :key="notification.id"
              @click="openRequestModal(notification)"
              v-if="notification.activitable">
            <div class="tile tile-centered tile-activity">
              <div class="tile-icon">
                <img :src="notification.user.avatar_url" class="avatar avatar-md" :alt="notification.user.name">
              </div>
              <div class="tile-content">
                <p class="tile-title" v-html="$t(`notifications.${notification.activitable_type.toLowerCase()}.${notification.kind}`, { name: notification.user.name })"></p>
                <p class="tile-subtitle">{{ notification.created_at | moment_activity }}</p>
              </div>
              <div class="tile-action" v-if="notification.activitable.status === 'pending'">
                <span class="label label-warning">{{ $t('meta.request_statuses.pending') }}</span>
              </div>
            </div>
          </li>
        </ul>
        <p class="no-notification-msg" v-else>
          {{ $t('header.noNotificationMsg') }}
        </p>
      </div>
    </div>
    <modal :title="$t('notifications.title')" :modal-open.sync="isAddModalOpen" v-if="isEditable(notification)">
      <div class="form-group">
        <label class="form-label">{{ $t('notifications.labels.date') }}</label>
        <flat-pickr
          :config="{ enable: [notification.activitable.attendance_day], locale: flatpickrLocaleMapper[currentUser.language] }"
          class="form-input daterange-picker"
          :value="notification.activitable.attendance_day"
          disabled />
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('notifications.labels.attendedAt') }}</label>
        <input type="time" class="form-input" :value="notification.activitable.attended_at" disabled>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('notifications.labels.leftAt') }}</label>
        <input type="time" class="form-input" :value="notification.activitable.left_at" disabled>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('notifications.labels.reason') }}</label>
        <textarea class="form-input" :value="notification.activitable.reason" disabled></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('notifications.labels.rejectReason') }}</label>
        <textarea class="form-input" :placeholder="$t('notifications.labels.rejectReason')" v-model="rejectReason"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" @click="submitAddModal(notification.activitable_id, approveNotificationRequest, $t('messages.request.approvedSuccess'))">{{ $t('notifications.btn.approve') }}</button>
        <button type="button" class="btn btn-error" @click="submitAddModal({ id: notification.activitable_id, admin_reason: rejectReason }, rejectNotificationRequest, $t('messages.request.rejectedSuccess'))">{{ $t('notifications.btn.reject') }}</button>
      </div>
    </modal>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '../mixins/flatpickr-locale'
import dropdown from '../mixins/dropdown'
import modal from '../mixins/modal'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { SET_INTERVAL_FETCH_NOTIFICATIONS } from '../store/mutation-types'

export default {
  name: 'notifications',
  mixins: [dropdown, modal, flatpickrLocale],

  data () {
    return {
      notification: '',
      rejectReason: ''
    }
  },

  components: {
    flatPickr
  },

  computed: {
    ...mapState('notifications', [
      'hasIntervalFetchNotifications',
      'unreadNotificationsCount',
      'headerNotifications',
      'pager'
    ]),

    ...mapGetters('notifications', [
      'displayNotificationsCount'
    ])
  },

  methods: {
    loadMoreOnScroll () {
      let el = this.$refs.notiList

      if (el.scrollTop + el.offsetHeight === el.scrollHeight && this.pager.next_page) {
        this.getMoreHeaderNotifications({ page: this.pager.next_page })
      }
    },

    toggleDropdown () {
      let el = this.$refs.notiList

      this.isDropdownActive = !this.isDropdownActive
      if (this.isDropdownActive && this.headerNotifications[0]) this.readNotifications(this.headerNotifications[0].id)
      if (this.isDropdownActive && el !== undefined) {
        el.addEventListener('scroll', this.loadMoreOnScroll)
      } else if (!this.isDropdownActive && el !== undefined) {
        el.removeEventListener('scroll', this.loadMoreOnScroll)
      }
    },

    ...mapActions('notifications', [
      'readNotifications',
      'getHeaderNotifications',
      'getMoreHeaderNotifications',
      'getNewHeaderNotifications',
      'approveNotificationRequest',
      'rejectNotificationRequest'
    ]),

    ...mapMutations('notifications', [
      SET_INTERVAL_FETCH_NOTIFICATIONS
    ]),

    openRequestModal (notification) {
      this.isAddModalOpen = !this.isAddModalOpen
      this.notification = notification
    },

    isEditable (notification) {
      return ['create', 'update'].includes(notification.kind) &&
             notification.activitable_type === 'Request' &&
             !['approved', 'rejected'].includes(notification.activitable.status)
    }
  },

  created () {
    if (!this.hasIntervalFetchNotifications) {
      this.getHeaderNotifications()
          .then(() => {
            this[SET_INTERVAL_FETCH_NOTIFICATIONS](setInterval(this.getNewHeaderNotifications, 10000))
          })
    }
  }
}
</script>
