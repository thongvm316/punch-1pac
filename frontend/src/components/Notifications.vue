<template>
  <div>
    <div
      ref="dropdownMenu"
      class="dropdown mr-5"
      :class="{ active: isDropdownActive }"
      @click="toggleDropdown"
    >
      <span
        class="notification"
        :class="{ badge: unreadNotificationsCount }"
        :data-badge="displayNotificationsCount"
      >
        <p-ico-bell />
      </span>
      <div class="box notifications notification-dropdown triangle-top">
        <div class="notification-header">
          <h4>{{ $t('header.notifications') }}</h4>
        </div>
        <ul
          v-if="headerNotifications.length"
          ref="notiList"
        >
          <li
            v-for="headerNotification in headerNotifications"
            :key="headerNotification.id"
            :class="{ 'notification-pending': headerNotification.activitable.status === 'pending' }"
            @click="openRequestModal(headerNotification)"
          >
            <div class="tile tile-centered tile-activity">
              <div class="tile-icon">
                <img
                  :src="headerNotification.user.avatar_url"
                  class="avatar avatar-md"
                  :alt="headerNotification.user.name"
                >
              </div>
              <div class="tile-content">
                <p
                  class="tile-title"
                  v-html="$t(`notification.${headerNotification.activitable_type.toLowerCase()}.${headerNotification.kind}`, { name: headerNotification.user.name })"
                />
                <p class="tile-subtitle">
                  {{ headerNotification.created_at | moment_activity }}
                </p>
              </div>
              <div
                v-if="headerNotification.activitable.status === 'pending'"
                class="tile-action"
              >
                <span class="label label-warning">{{ $t('meta.request_statuses.pending') }}</span>
              </div>
            </div>
          </li>
        </ul>
        <p
          v-else
          class="no-notification-msg"
        >
          {{ $t('header.noNotificationMsg') }}
        </p>
      </div>
    </div>
    <modal
      v-if="isEditable(notification)"
      ref="requestModal"
      :title="isRequestDayOff ? $t('modal.annualLeave.title') : $t('modal.attendance.editTitle') "
      :modal-open.sync="isAddModalOpen"
    >
      <div class="form-group">
        <label class="form-label">{{ $t('label.date') }}</label>
        <flat-pickr
          :config="{ mode: 'single', enable: [notification.activitable.attendance_day], locale: flatpickrLocaleMapper[pickrLocale] }"
          class="form-input daterange-picker"
          :value="notification.activitable.attendance_day"
          disabled
        />
      </div>
      <div
        v-if="!isRequestDayOff"
        class="form-group"
      >
        <label class="form-label">{{ $t('label.attendedAt') }}</label>
        <input
          type="time"
          class="form-input time-picker"
          :value="notification.activitable.attended_at"
          disabled
        >
      </div>
      <div
        v-if="!isRequestDayOff"
        class="form-group"
      >
        <label class="form-label">{{ $t('label.leftAt') }}</label>
        <input
          type="time"
          class="form-input time-picker"
          :value="notification.activitable.left_at"
          disabled
        >
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.reason') }}</label>
        <textarea
          class="form-input"
          :value="notification.activitable.reason"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.rejectReason') }}</label>
        <textarea
          v-model="rejectReason"
          class="form-input"
          :placeholder="$t('label.rejectReason')"
        />
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-success"
          @click="submitAddModal(notification.activitable_id, approveNotificationRequest, $t('messages.request.approvedSuccess'))"
        >
          {{ $t('button.common.approve') }}
        </button>
        <button
          type="button"
          class="btn btn-error"
          @click="submitAddModal({ id: notification.activitable_id, admin_reason: rejectReason }, rejectNotificationRequest, $t('messages.request.rejectedSuccess'))"
        >
          {{ $t('button.common.reject') }}
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import flatpickrLocale from '@/mixins/flatpickr-locale'
import dropdown from '@/mixins/dropdown'
import modal from '@/mixins/modal'
const PIcoBell = () => import('@/punch-ui/punch-icons/PIcoBell')
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'Notifications',

  components: {
    flatPickr,
    PIcoBell
  },

  mixins: [dropdown, modal, flatpickrLocale],

  data() {
    return {
      notification: {},
      rejectReason: ''
    }
  },

  computed: {
    ...mapState('notifications', ['unreadNotificationsCount', 'headerNotifications', 'pager']),

    ...mapGetters('notifications', ['displayNotificationsCount']),

    isRequestDayOff() {
      return this.notification.activitable.kind === 'annual_leave'
    }
  },

  created() {
    this.getHeaderNotifications()
  },

  methods: {
    loadMoreOnScroll() {
      let el = this.$refs.notiList

      if (el.scrollTop + el.offsetHeight === el.scrollHeight && this.pager.next_page) {
        this.getMoreHeaderNotifications({ page: this.pager.next_page })
      }
    },

    toggleDropdown() {
      let el = this.$refs.notiList

      this.isDropdownActive = !this.isDropdownActive
      if (this.isDropdownActive && this.headerNotifications[0]) this.readNotifications(this.headerNotifications[0].id)
      if (this.isDropdownActive && el) {
        el.addEventListener('scroll', this.loadMoreOnScroll)
      } else if (!this.isDropdownActive && el) {
        el.removeEventListener('scroll', this.loadMoreOnScroll)
      }
    },

    ...mapActions('notifications', [
      'readNotifications',
      'getHeaderNotifications',
      'getMoreHeaderNotifications',
      'approveNotificationRequest',
      'rejectNotificationRequest'
    ]),

    openRequestModal(notification) {
      this.isAddModalOpen = !this.isAddModalOpen
      this.notification = notification
    },

    isEditable(notification) {
      return ['create', 'update'].includes(notification.kind) && notification.activitable_type === 'Request' && !['approved', 'rejected'].includes(notification.activitable.status)
    }
  }
}
</script>
