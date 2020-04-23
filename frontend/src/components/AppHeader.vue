<template>
  <header class="header">
    <div class="container">
      <div class="navbar">
        <section class="navbar-section">
          <router-link
            to="/dashboard"
            class="navbar-brand mr-4"
          >
            <img
              :src="currentCompany.logo_url"
              :alt="currentCompany.name"
            >
          </router-link>
          <router-link
            class="mr-5"
            to="/attendances"
          >
            {{ $t('header.attendances') }}
          </router-link>
          <router-link
            class="mr-5"
            to="/requests"
          >
            {{ $t('header.requests') }}
          </router-link>
          <router-link
            v-if="$auth('Page', currentUser).canViewGroups()"
            class="mr-5"
            to="/groups"
          >
            {{ $t('header.groups') }}
          </router-link>
        </section>
        <section class="navbar-section">
          <punch />
          <annual-leave />
          <notifications />
          <div
            ref="dropdownMenu"
            class="dropdown"
            :class="{ active: isDropdownActive }"
            @click="toggleDropdown"
          >
            <a class="dropdown-toggle">
              <div class="tile tile-centered mr-2">
                <div class="tile-icon">
                  <img
                    :src="currentUser.avatar_url"
                    class="avatar avatar-md"
                    :alt="currentUser.name"
                  >
                </div>
              </div>
            </a>
            <ul
              v-show="!isLangSelectActive"
              class="menu triangle-top"
            >
              <li class="menu-item">
                <router-link to="/settings">
                  {{ $t('header.settings') }}
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  v-if="$auth('Page', currentUser).canViewCompanySettings()"
                  to="/company/settings"
                >
                  {{ $t('header.companySettings') }}
                </router-link>
              </li>
              <li class="menu-item">
                <a
                  ref="toggleLangSelectBtn"
                  @click="toggleLangSelect"
                >{{ $t('header.changeLanguage') }}...</a>
              </li>
              <li class="menu-item">
                <a
                  ref="logoutBtn"
                  href="#"
                  @click="logout($event)"
                >{{ $t('header.logout') }}</a>
              </li>
            </ul>

            <ul
              v-show="isLangSelectActive"
              class="menu triangle-top lang-select"
            >
              <li class="header">
                <a
                  class="btn-back"
                  @click="toggleLangSelect"
                />
                <p>{{ $t('header.languages') }}</p>
              </li>
              <li
                v-for="(language, key) in meta.languages"
                :key="key"
                ref="languageItem"
                class="menu-item"
              >
                <a
                  :class="{ active: language === $i18n.locale }"
                  @click="updateUser(language)"
                >{{ $t(`meta.languages.${language}`) }}</a>
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
import Repositories from '@/repository'
import { mapState, mapMutations } from 'vuex'
import dropdown from '@/mixins/dropdown'
import { INITIAL_STATES_UPDATE_USER_LANGUAGE } from '@/store/mutation-types'
const Notifications = () => import('./Notifications')
const Punch = () => import('./Punch')
const AnnualLeave = () => import('./AnnualLeave')

export default {
  name: 'AppHeader',

  components: {
    Notifications,
    AnnualLeave,
    Punch
  },

  mixins: [dropdown],

  computed: {
    ...mapState('initialStates', ['currentCompany', 'meta'])
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
      const usersRepository = Repositories.get('users')

      usersRepository.updateUser(this.currentUser.id, { data: { user: { language } } })
        .then(() => {
          this.$i18n.locale = language
          this[INITIAL_STATES_UPDATE_USER_LANGUAGE](language)
        })
    }
  }
}
</script>
