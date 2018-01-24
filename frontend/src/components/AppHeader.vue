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
          <span class="text-bold-600 mr-5">Jan 22, 2018 08:30</span>
          <button class="btn btn-primary mr-5">Punch In</button>
          <span class="announcement mr-5" :class="{ badge: num_announcement }" :data-badge="num_announcement">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
              d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
              2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
              0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
          </span>
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
              <li class="menu-item"><a href="#" @click="logout($event)">Logout</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app-header',
  data () {
    return {
      isDropdownActive: false,
      num_announcement: 0
    }
  },

  methods: {
    logout (e) {
      e.preventDefault()
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
