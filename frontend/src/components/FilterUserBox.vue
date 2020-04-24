<template>
  <v-select
    v-model="selectedUser"
    label="email"
    :filterable="false"
    :placeholder="placeholder"
    :options="optionUsers"
    @search="filterUsers"
    @input="updateSelectedUser"
  >
    <template
      slot="option"
      slot-scope="option"
    >
      <div class="tile tile-centered">
        <div class="tile-icon">
          <img
            :src="option.avatar_url"
            class="avatar avatar-md"
          >
        </div>
        <div class="tile-content">
          {{ option.name }} ({{ option.email }})
        </div>
      </div>
    </template>
    <span slot="no-options">{{ $t('filterUserBox.noOptions') }}</span>
  </v-select>
</template>

<script>
import Repositories from '@/repository'
import debounce from 'lodash.debounce'
const vSelect = () => import('vue-select')

export default {
  components: {
    vSelect
  },

  props: {
    queryParams: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      optionUsers: [],
      selectedUser: null
    }
  },

  watch: {
    user: function() {
      this.optionUsers = []
      this.selectedUser = this.user
    }
  },

  created() {
    this.search('', false)
  },

  methods: {
    filterUsers: debounce(function(search, loading) {
      loading(true)
      this.search(search, loading)
    }, 350),

    search(search, loading) {
      const params = Object.assign({ name_or_email: search }, this.queryParams)

      Repositories.get('users').getUsers(params)
        .then(response => {
          if (loading) loading(false)
          this.optionUsers = response.data.users
        })
        .catch(error => {
          throw error
        })
    },

    updateSelectedUser() {
      this.$emit('update:user', this.selectedUser)
    }
  }
}
</script>
