<template>
  <div>
    <p class="mb-2">{{ $t('company.users.addMulti.note') }}</p>
    <a :href="meta.csv_template_url" class="label label-success mb-2">{{ $t('company.users.addMulti.download') }}</a>
    <p class="mb-2">{{ $t('company.users.addMulti.templateGuide') }}</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.csv_file }">
        <label class="form-label">{{ $t('label.csvFile') }}</label>
        <input class="form-input" type="file" @change="setCsvFile">
        <p class="form-input-hint" v-if="errors.csv_file">{{ $t('label.csvFile') }} {{ errors.csv_file[0] }}</p>
      </div>
      <div class="form-group" v-if="errors.lines && errors.lines.length > 0">
        <p class="form-input-hint text-error">{{ $t('company.users.addMulti.errorMsg', { lines: errors.lines.join(', ') }) }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-success btn-submit" @click="upload()" :disabled="isDisable">{{ $t('button.common.submit') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import 'formdata-polyfill'
import handleSuccess from '../mixins/handle-success'

export default {
  name: 'users-add-form',

  data() {
    return {
      isDisable: false,
      errors: {},
      params: {
        csv_file: null
      }
    }
  },

  mixins: [handleSuccess],

  computed: {
    ...mapState('initialStates', ['meta'])
  },

  methods: {
    ...mapActions('companyUsers', ['createMultiUser']),

    upload() {
      this.isDisable = true

      this.createMultiUser(this.params)
        .then(response => {
          const message = this.$t('messages.user.addMultiSuccess')
          this.handleSuccess({ message, emitType: 'afterAdded' })
          this.errors = response.data.errors
        })
        .catch(error => {
          this.isDisable = false
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
          else throw error
        })
    },

    setCsvFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.csv_file = files[0]
    }
  }
}
</script>
