<template>
  <v-select
    label="email"
    :filterable="false"
    @search="filterUsers"
    @input="updateSelectedUser"
    :placeholder="placeholder"
    v-model="selectedUser"
    :options="optionUsers">
    <template slot="option" slot-scope="option">
      <div class="tile tile-centered">
        <div class="tile-icon">
          <img :src="option.avatar_url" class="avatar avatar-md">
        </div>
        <div class="tile-content">{{ option.name }} ({{ option.email }})</div>
      </div>
    </template>
  </v-select>
</template>

<script>
import axios from 'axios'
import vSelect from 'vue-select'
import debounce from 'lodash.debounce'

export default {
  data () {
    return {
      optionUsers: [],
      selectedUser: null
    }
  },

  props: ['placeholder', 'queryParams', 'user'],

  components: {
    vSelect
  },

  methods: {
    filterUsers: debounce(function (search, loading) {
      loading(true)
      this.search(search, loading)
    }, 350),

    search (search, loading) {
      axios.get('/users', { params: Object.assign({ name_or_email: search }, this.queryParams) })
            .then(response => {
              loading(false)
              this.optionUsers = response.data.users
            })
            .catch(error => { throw error })
    },

    updateSelectedUser () {
      this.$emit('update:user', this.selectedUser)
    }
  },

  watch: {
    user: function () {
      this.optionUsers = []
      this.selectedUser = this.user
    }
  }
}
</script>
