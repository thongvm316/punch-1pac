<template>
  <header class="header">
    <div class="container">
      <div class="navbar">
        <section class="navbar-section">
          <router-link to="/dashboard" class="navbar-brand mr-4">
            <img :src="currentCompany.logo_url" :alt="currentCompany.name">
          </router-link>
          <router-link class="mr-5" to="/attendances">{{ $t('header.attendances') }}</router-link>
          <router-link class="mr-5" to="/requests">{{ $t('header.requests') }}</router-link>
          <router-link class="mr-5" to="/groups" v-if="$auth('Page', currentUser).canViewGroups()">{{ $t('header.groups') }}</router-link>
        </section>
        <section class="navbar-section">
          <punch/>
          <annual-leave/>
          <notifications/>
          <div class="dropdown" :class="{ active: isDropdownActive }" @click="toggleDropdown" ref="dropdownMenu">
            <a class="dropdown-toggle">
              <div class="tile tile-centered mr-2">
                <div class="tile-icon">
                  <img :src="currentUser.avatar_url" class="avatar avatar-md" :alt="currentUser.name">
                </div>
              </div>
            </a>
            <ul class="menu triangle-top" v-if="!isLangSelectActive">
              <li class="menu-item"><router-link to="/settings">{{ $t('header.settings') }}</router-link></li>
              <li class="menu-item"><router-link to="/company/settings" v-if="$auth('Page', currentUser).canViewCompanySettings()">{{ $t('header.companySettings') }}</router-link></li>
              <li class="menu-item"><a @click="toggleLangSelect" ref="toggleLangSelectBtn">{{ $t('header.changeLanguage') }}...</a></li>
              <li class="menu-item"><a href="#" @click="logout($event)" ref="logoutBtn">{{ $t('header.logout') }}</a></li>
            </ul>

            <ul class="menu triangle-top lang-select" v-else>
              <li class="header">
                <a class="btn-back" @click="toggleLangSelect"></a>
                <p>{{ $t('header.languages') }}</p>
              </li>
              <li class="menu-item" v-for="(language, key) in meta.languages" :key="key">
                <a @click="updateUser(language)" :class="{ active: language === $i18n.locale }">{{ $t(`meta.languages.${language}`) }}</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import dropdown from '../mixins/dropdown'
import { mapState, mapMutations } from 'vuex'
import { INITIAL_STATES_UPDATE_USER_LANGUAGE } from '../store/mutation-types'
const Notifications = () => import('./Notifications')
const Punch = () => import('./Punch')
const AnnualLeave = () => import('./AnnualLeave')

export default {
  name: 'app-header',
  mixins: [dropdown],

  components: {
    Notifications,
    AnnualLeave,
    Punch
  },

  methods: {
    ...mapMutations('initialStates', [INITIAL_STATES_UPDATE_USER_LANGUAGE]),

    logout() {
      axios.post('/logout', {}, { baseURL: '' }).then(() => {
        window.location.href = '/'
      })
    },

    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive
    },

    toggleLangSelect() {
      this.isDropdownActive = !this.isDropdownActive
      this.isLangSelectActive = !this.isLangSelectActive
    },

    updateUser(language) {
      if (this.$i18n.locale === language) return

      axios.put(`/users/${this.currentUser.id}`, { user: { language } }).then(response => {
        this.$i18n.locale = language
        this[INITIAL_STATES_UPDATE_USER_LANGUAGE](language)
      })
    }
  },

  computed: {
    ...mapState('initialStates', ['currentCompany', 'meta'])
  }
}
</script>
