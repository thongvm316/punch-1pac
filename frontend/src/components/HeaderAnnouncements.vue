<template>
  <div class="dropdown mr-5" :class="{ active: isActive }" @click="toggle" ref="toggle">
    <span class="announcement" :class="{ badge: numAnnouncement }" :data-badge="numAnnouncement">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
        d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
        2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
        0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
    </span>
    <div class="box announcement-dropdown">
      <h4>Announcements</h4>
      <ul>
        <router-link
          tag="li"
          v-for="announcement in announcements"
          :to="`/announcements/${announcement.id}`"
          :key="announcement.id">
          <p>{{ announcement.title }}</p>
          <span>{{ announcement.created_at | datetime_short }}</span>
        </router-link>
      </ul>
      <router-link to="/announcements" tag="a">See All</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'header-announcements',

  data () {
    return {
      isActive: false
    }
  },

  methods: {
    toggle () {
      this.isActive = !this.isActive
    },

    documentClick (e) {
      let el = this.$refs.toggle
      let target = e.target
      if ((el !== target) && (!el.contains(target))) {
        this.isActive = false
      }
    },

    ...mapActions('headerAnnouncements', [
      'getAnnouncements'
    ])
  },

  computed: {
    ...mapState('headerAnnouncements', [
      'numAnnouncement',
      'announcements'
    ])
  },

  created () {
    document.addEventListener('click', this.documentClick)
    if (this.announcements.length === 0) {
      this.getAnnouncements()
    }
  },

  destroyed () {
    document.removeEventListener('click', this.documentClick)
  }
}
</script>
