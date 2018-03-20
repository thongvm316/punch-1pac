<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.users.addMulti.title')">
    <p class="mb-2">{{ $t('company.users.addMulti.note') }}</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.csv_file }">
        <label class="form-label">{{ $t('company.users.addMulti.labels.csvFile') }}</label>
        <input class="form-input" type="file" @change="setCsvFile">
        <p class="form-input-hint" v-if="errors.csv_file">{{ $t('company.users.addMulti.labels.csvFile') }} {{ errors.csv_file[0] }}</p>
      </div>
      <div class="form-group" v-if="errors.lines">
        <p class="form-input-hint text-error">{{ $t('company.users.addMulti.errorMsg', { lines: errors.lines.join(', ') }) }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="upload(params)">{{ $t('company.users.addMulti.btn.submit') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      errors: {},
      params: {
        csv_file: null
      }
    }
  },

  components: {
    SettingLayout
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    upload (params) {
      if (!params.csv_file) return
      let formData = new FormData()
      formData.append('csv_file', params.csv_file)
      axios.post('/users/create_multi', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
           .then(response => {
             this.setFlashMsg(this.$t('messages.user.addMultiSuccess'))
             this.errors = response.data.errors
           })
           .catch(error => {
             if (error.response && error.response.status === 422) this.errors = error.response.data.errors
             else throw error
           })
    },

    setCsvFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.csv_file = files[0]
    }
  }
}
</script>
