<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Profile">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label">Logo</label>
        <img class="img-profile" :src="currentCompany.logo_url" :alt="currentCompany.name">
        <input class="form-input" type="file">
      </div>
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" v-model="params.name">
      </div>
      <div class="form-group">
        <label class="form-label">Namespace</label>
        <input class="form-input" type="text" v-model="params.namespace">
      </div>
      <div class="form-group">
        <label class="form-label">Industry</label>
        <select class="form-select" v-model="params.industry">
          <option value="startup">Startup</option>
          <option value="ecomerce">Ecormerce</option>
          <option value="marketing">Marketing</option>
          <option value="banking">Banking</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Country</label>
        <input class="form-input" type="text" v-model="params.country">
      </div>
      <div class="form-group">
        <label class="form-label">Address</label>
        <input class="form-input" type="text" v-model="params.address">
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <input class="form-input" type="text" v-model="params.phoneNumber">
      </div>
      <div class="form-group">
        <label class="form-label">Postal Code</label>
        <input class="form-input" type="text" v-model="params.postalCode">
      </div>
      <div class="form-group">
        <label class="form-label">Tax Code</label>
        <input class="form-input" type="text" v-model="params.taxCode">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Save</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState } from 'vuex'

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
        phoneNumber: '',
        postalCode: '',
        taxCode: ''
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

  created () {
    this.params.name = this.currentCompany.name
    this.params.namespace = this.currentCompany.namespace
    this.params.industry = this.currentCompany.industry
    this.params.country = this.currentCompany.country
    this.params.address = this.currentCompany.address
    this.params.phoneNumber = this.currentCompany.phone_number
    this.params.postalCode = this.currentCompany.postal_code
    this.params.taxCode = this.currentCompany.tax_code
  }
}
</script>
