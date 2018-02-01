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
          <punch/>
          <header-announcements/>
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
import HeaderAnnouncements from '../components/HeaderAnnouncements.vue'
import Punch from '../components/Punch.vue'

export default {
  name: 'app-header',
  data () {
    return {
      isDropdownActive: false
    }
  },

  components: {
    HeaderAnnouncements,
    Punch
  },

  methods: {
    logout () {
      axios.post('/logout').then(() => { window.location.href = '/' })
    },

    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
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
  }
}
</script>
