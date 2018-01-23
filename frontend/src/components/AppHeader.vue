<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link to="/dashboard" class="navbar-brand px-4">
        <img :src="companyLogoUrl" :alt="companyName">
      </router-link>
    </section>
    <section class="navbar-section">
      <a href="/modules">
        <span class="badge px-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
            d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097
            2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552
            0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
        </span>
      </a>
      <div class="dropdown px-4" :class="{ active: isDropdownActive }" @click="toggleDropdown">
        <a class="dropdown-toggle">
          <div class="tile tile-centered">
            <div class="tile-icon">
              <img :src="userAvatarUrl" class="avatar avatar-md" :alt="userName">
            </div>
            <div class="tile-content mr-2">{{ userName }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </div>
        </a>
        <ul class="menu">
          <li class="menu-item"><router-link to="/settings">Profile</router-link></li>
          <li class="menu-item"><router-link to="/company">Company Setting</router-link></li>
          <li class="menu-item"><a href="#" @click="logout($event)">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'appHeader',
  data () {
    return {
      isDropdownActive: false,
      companyName: window.INITIAL_STATE.company.name,
      companyLogoUrl: window.INITIAL_STATE.company.logo_url,
      userName: window.INITIAL_STATE.user.name,
      userAvatarUrl: window.INITIAL_STATE.user.avatar_url
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
  }
}
</script>
