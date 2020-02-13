<template>
  <main-layout
    :title="$t('dashboard.title')"
    :is-open-announcement="true"
  >
    <div class="columns mt-5">
      <div class="column col-8">
        <div class="box p-0">
          <full-calendar />
        </div>
        <status-cards />
      </div>
      <div class="column col-4">
        <div
          v-if="$auth('Page', currentUser).canViewPendingBlock()"
          class="box"
        >
          <h2 class="subtitle">
            {{ $t('dashboard.pendingRequests') }}
          </h2>
          <div v-if="pendingRequests.length > 0">
            <p class="mb-0">
              {{ $t('dashboard.havePendingRequests') }}
            </p>
            <ul class="list-pending-requests">
              <router-link
                v-for="request in pendingRequests"
                :key="request.id"
                tag="li"
                :to="`/groups/${request.id}/requests?status=pending`"
              >
                <a>{{ request.name }} ({{ request.num_pending_request }})</a>
              </router-link>
            </ul>
          </div>
          <p
            v-else
            class="mb-0"
          >
            {{ $t('dashboard.emptyPendingRequests') }}
          </p>
        </div>

        <div class="box">
          <h2 class="subtitle">
            {{ $t('dashboard.recentActivities') }}
          </h2>
          <div
            v-if="activities.length > 0"
            class="notifications"
          >
            <ul>
              <li
                v-for="activity in activities"
                :key="activity.id"
                class="px-0"
              >
                <div class="tile tile-centered tile-activity">
                  <div class="tile-icon">
                    <img
                      :src="activity.user.avatar_url"
                      class="avatar avatar-md"
                      :alt="activity.user.name"
                    >
                  </div>
                  <div class="tile-content">
                    <p
                      class="tile-title"
                      v-html="$t(`activity.${activity.activitable_type.toLowerCase()}.${activity.kind}`, { name: activity.user.name })"
                    />
                    <p class="tile-subtitle">
                      {{ activity.created_at | moment_activity }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <p
            v-else
            class="mb-0"
          >
            {{ $t('dashboard.emptyActivity') }}
          </p>
          <div
            v-if="pager.next_page"
            class="text-center"
          >
            <button
              type="button"
              class="btn btn-block"
              @click="getMoreActivities({ page: pager.next_page })"
            >
              {{ $t('button.common.showMore') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const MainLayout = () => import('../layouts/Main.vue')
const FullCalendar = () => import('../components/FullCalendar.vue')
const StatusCards = () => import('../components/StatusCards.vue')

export default {
  components: {
    MainLayout,
    FullCalendar,
    StatusCards
  },

  computed: {
    ...mapState('activities', ['pager', 'activities']),

    ...mapState('groupPendingRequests', ['pendingRequests'])
  },

  created() {
    this.getActivities()
    if (this.$auth('Page', this.currentUser).canViewPendingBlock()) this.getGroupPendingRequests()
  },

  methods: {
    ...mapActions('activities', ['getActivities', 'getMoreActivities']),

    ...mapActions('groupPendingRequests', ['getGroupPendingRequests'])
  }
}
</script>
