<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Add Multiple Users">
    <p class="text-success mb-2" v-if="msgSuccess">Users in csv file are created</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.csv_file }">
        <label class="form-label">CSV file</label>
        <input class="form-input" type="file" @change="setCsvFile">
        <p class="form-input-hint" v-if="errors.csv_file">{{ errors.csv_file[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="upload(params)">Submit</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import axios from 'axios'

export default {
  data () {
    return {
      msgSuccess: false,
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
    upload (params) {
      if (!params.csv_file) return
      let formData = new FormData()
      formData.append('csv_file', params.csv_file)
      axios.post('/users/create_multi', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
           .then(response => { this.msgSuccess = true })
           .catch(error => {
             if (error.response && error.response.status === 422) this.errors = error.response.data.errors
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
