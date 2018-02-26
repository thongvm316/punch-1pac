<template>
  <div class="dropdown mr-5" :class="{ active: isDropdownActive }" @click="toggleDropdown" ref="dropdownMenu">
    <span class="announcement" :class="{ badge: countHeaderAnnouncements }" :data-badge="countHeaderAnnouncements">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
        d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
        2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
        0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
    </span>
    <div class="box announcement-dropdown">
      <h4>Announcements</h4>
      <ul v-if="getFirstFive.length > 0">
        <router-link
          tag="li"
          v-for="announcement in getFirstFive"
          :to="`/announcements/${announcement.id}`"
          :key="announcement.id">
          <p>{{ announcement.title }}</p>
          <span>{{ announcement.created_at | datetime_short }}</span>
        </router-link>
      </ul>
      <p class="no-announcement-msg" v-else>
        You have no new announcements
      </p>
      <router-link to="/announcements" tag="a">See All</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import dropdown from '../mixins/dropdown'

export default {
  name: 'header-announcements',
  mixins: [dropdown],

  methods: {
    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
    },

    ...mapActions('announcements', [
      'getHeaderAnnouncements'
    ])
  },

  computed: {
    ...mapState('announcements', [
      'headerAnnouncements'
    ]),

    ...mapGetters('announcements', [
      'countHeaderAnnouncements',
      'getFirstFive'
    ])
  },

  created () {
    if (this.headerAnnouncements.length === 0) {
      this.getHeaderAnnouncements()
    }
  }
}
</script>
