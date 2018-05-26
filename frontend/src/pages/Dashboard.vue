<template>
  <main-layout :title="$t('dashboard.title')" :is-open-announcement="true">
    <div class="columns mt-5">
      <div class="column col-8">
        <div class="box p-0">
          <full-calendar></full-calendar>
        </div>
        <status-cards/>
      </div>
      <div class="column col-4">
        <div class="box" v-if="$auth('Page', currentUser).canViewPendingBlock()">
          <h2 class="subtitle">{{ $t('dashboard.pendingRequests') }}</h2>
          <div v-if="pendingRequests.length > 0">
            <p class="mb-0">
              {{ $t('dashboard.havePendingRequests') }}
            </p>
            <ul class="list-pending-requests">
              <router-link tag="li" :to="`/groups/${request.id}/requests?status=pending`" v-for="request in pendingRequests" :key="request.id">
                <a>{{ request.name }} ({{request.num_pending_request}})</a>
              </router-link>
            </ul>
          </div>
          <p class="mb-0" v-else>{{ $t('dashboard.emptyPendingRequests') }}</p>
        </div>

        <div class="box">
          <h2 class="subtitle">{{ $t('dashboard.recentActivities') }}</h2>
          <div class="notifications" v-if="activities.length > 0">
            <ul>
              <li class="px-0" v-for="activity in activities">
                <div class="tile tile-centered tile-activity">
                  <div class="tile-icon">
                    <img :src="activity.user.avatar_url" class="avatar avatar-md" :alt="activity.user.name">
                  </div>
                  <div class="tile-content">
                    <p class="tile-title" v-html="$t(`activity.${activity.activitable_type.toLowerCase()}.${activity.kind}`, { name: activity.user.name })"></p>
                    <p class="tile-subtitle">{{ activity.created_at | moment_activity }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <p class="mb-0" v-else>{{ $t('dashboard.emptyActivity') }}</p>
          <div class="text-center" v-if="pager.next_page">
            <button type="button" class="btn btn-block" @click="getMoreActivities({ page: pager.next_page })">{{ $t('activity.showMore') }}</button>
          </div>
        </div>

      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import FullCalendar from '../components/FullCalendar.vue'
import StatusCards from '../components/StatusCards.vue'
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('activities', ['getActivities', 'getMoreActivities']),

    ...mapActions('groupPendingRequests', ['getGroupPendingRequests'])
  },

  components: {
    MainLayout,
    FullCalendar,
    StatusCards
  },

  created() {
    this.getActivities()
    if (this.$auth('Page', this.currentUser).canViewPendingBlock()) this.getGroupPendingRequests()
  },

  computed: {
    ...mapState('activities', ['pager', 'activities']),

    ...mapState('groupPendingRequests', ['pendingRequests'])
  }
}
</script>
