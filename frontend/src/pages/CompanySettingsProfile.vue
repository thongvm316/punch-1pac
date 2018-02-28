<template>
  <setting-layout sidebar-type="company" :title="$t('title.companySettings')" :subtitle="$t('subtitle.profile')">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label">{{ $t('label.logo') }}</label>
        <img class="img-profile" :src="currentCompany.logo_url" :alt="currentCompany.name">
        <input class="form-input" type="file" @change="setLogoFile">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" v-model="params.name">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.namespace') }}</label>
        <input class="form-input" type="text" v-model="params.namespace">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.industry') }}</label>
        <select class="form-select" v-model="params.industry">
          <option value="startup">Startup</option>
          <option value="ecomerce">Ecormerce</option>
          <option value="marketing">Marketing</option>
          <option value="banking">Banking</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.country') }}</label>
        <input class="form-input" type="text" v-model="params.country">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.address') }}</label>
        <input class="form-input" type="text" v-model="params.address">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.phoneNum') }}</label>
        <input class="form-input" type="text" v-model="params.phone_number">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.postalCode') }}</label>
        <input class="form-input" type="text" v-model="params.postal_code">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.taxCode') }}</label>
        <input class="form-input" type="text" v-model="params.tax_code">
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateCompany(params)">{{ $t('button.save') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      params: {
        logo: null,
        name: '',
        namespace: '',
        industry: '',
        country: '',
        address: '',
        phone_number: '',
        postal_code: '',
        tax_code: ''
      }
    }
  },

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', [
      'currentCompany'
    ])
  },

  methods: {
    ...mapActions('initialStates', [
      'updateCompany'
    ]),

    setLogoFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.logo = files[0]
    }
  },

  created () {
    Object.keys(this.params).forEach(key => { this.params[key] = this.currentCompany[key] })
  }
}
</script>
