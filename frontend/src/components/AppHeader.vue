<template>
  <header class="header">
    <div class="container grid-xl">
      <div class="navbar">
        <section class="navbar-section">
          <router-link to="/dashboard" class="navbar-brand mr-4">
            <img :src="companyLogoUrl" :alt="companyName">
          </router-link>
          <router-link class="mr-5" to="/dashboard">Dashboard</router-link>
          <router-link class="mr-5" to="/attendances">Attendances</router-link>
          <router-link class="mr-5" to="/requests">Requests</router-link>
          <router-link class="mr-5" to="/groups">Groups</router-link>
        </section>
        <section class="navbar-section">
          <span class="text-bold-600 mr-5">{{ currentTime }}</span>
          <button class="btn btn-primary mr-5">Punch In</button>
          <header-announcements></header-announcements>
          <div class="dropdown" :class="{ active: isDropdownActive }" @click="toggleDropdown">
            <a class="dropdown-toggle">
              <div class="tile tile-centered">
                <div class="tile-icon">
                  <img :src="userAvatarUrl" class="avatar avatar-md" :alt="userName">
                </div>
                <div class="tile-content mr-2">{{ userName }}</div>
              </div>
            </a>
            <ul class="menu">
              <li class="menu-item"><router-link to="/settings">Settings</router-link></li>
              <li class="menu-item"><router-link to="/company/settings">Company Settings</router-link></li>
              <li class="menu-item"><a href="#" @click.prevent="logout($event)">Logout</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import HeaderAnnouncements from '../components/HeaderAnnouncements.vue'

export default {
  name: 'app-header',
  data () {
    return {
      isDropdownActive: false,
      currentTime: null
    }
  },

  components: {
    HeaderAnnouncements
  },

  methods: {
    logout () {
      axios.post('/logout').then(() => { window.location.href = '/' })
    },

    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
    },

    updateCurrentTime () {
      this.currentTime = moment().format('HH:mm:ss')
    }
  },

  computed: {
    companyName () {
      return window.INITIAL_STATE.company.name
    },

    companyLogoUrl () {
      return window.INITIAL_STATE.company.logo_url
    },

    userName () {
      return window.INITIAL_STATE.user.name
    },

    userAvatarUrl () {
      return window.INITIAL_STATE.user.avatar_url
    }
  },

  created () {
    this.currentTime = moment().format('HH:mm:ss')
    setInterval(this.updateCurrentTime, 1 * 1000)
  }
}
</script>
