<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Profile">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-1">Logo</label>
        <img class="img-profile" :src="companyLogoUrl" :alt="companyName">
        <input class="form-input" type="file" id="input-example-1">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-2">Name</label>
        <input class="form-input" type="text" id="input-example-2" :value="companyName" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-3">Namespace</label>
        <input class="form-input" type="text" id="input-example-3" :value="companyNamespace" placeholder="Namespace">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-4">Industry</label>
        <select class="form-select" id="input-example-4">
          <option selected>Startup</option>
          <option> > 2 Years</option>
          <option> > 5 Years</option>
          <option> > 10 Years</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-5">Country</label>
        <input class="form-input" type="text" id="input-example-5" :value="companyCountry" placeholder="Country">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-6">Address</label>
        <input class="form-input" type="text" id="input-example-6" :value="companyAddress" placeholder="Address">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-7">Phone Number</label>
        <input class="form-input" type="text" id="input-example-7" :value="companyPhoneNumber" placeholder="Phone Number">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-8">Postal Code</label>
        <input class="form-input" type="text" id="input-example-8" :value="companyPostalCode" placeholder="Postal Code">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-9">Tax Code</label>
        <input class="form-input" type="text" id="input-example-9" :value="companyTaxCode" placeholder="Tax Code">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Save</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'

export default {
  components: {
    SettingLayout
  },

  computed: {
    companyName () {
      return window.INITIAL_STATE.company.name
    },

    companyNamespace () {
      return window.INITIAL_STATE.company.namespace
    },

    companyLogoUrl () {
      return window.INITIAL_STATE.company.logo_url
    },
    companyCountry () {
      return window.INITIAL_STATE.company.country
    },

    companyAddress () {
      return window.INITIAL_STATE.company.address
    },

    companyPhoneNumber () {
      return window.INITIAL_STATE.company.phone_number
    },

    companyPostalCode () {
      return window.INITIAL_STATE.company.postal_code
    },

    companyTaxCode () {
      return window.INITIAL_STATE.company.tax_code
    }
  }
}
</script>
