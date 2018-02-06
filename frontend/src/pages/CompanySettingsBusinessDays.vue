<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Business Days">
    <div class="toolbar text-right mt-5">
      <button type="button" class="btn" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add Business Days
      </button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>Weekday</th>
        <th>Start at</th>
        <th>End at</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="businessDay in businessDays">
          <td>{{ businessDay.weekday }}</td>
          <td>{{ businessDay.started_at }}</td>
          <td>{{ businessDay.ended_at }}</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleEditModal(businessDay)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="deleteBusinessDay(businessDay.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal title="Add Business Day" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">Weekday</label>
        <select class="form-select" v-model="createParams.weekday">
          <option>monday</option>
          <option>tuesday</option>
          <option>wednesday</option>
          <option>thursday</option>
          <option>friday</option>
          <option>saturday</option>
          <option>sunday</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Start at</label>
        <select class="form-select" v-model="createParams.started_at">
          <option>01:00</option>
          <option>03:00</option>
          <option>06:00</option>
          <option>09:00</option>
          <option>12:00</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">End at</label>
        <select class="form-select" v-model="createParams.ended_at">
          <option>01:00</option>
          <option>03:00</option>
          <option>06:00</option>
          <option>09:00</option>
          <option>12:00</option>
        </select>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="addBusinessDay(createParams)">Submit</button>
      </div>
    </modal>

    <modal title="Edit Business Day" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">Weekday</label>
        <select class="form-select" v-model="updateParams.weekday">
          <option>monday</option>
          <option>tuesday</option>
          <option>wednesday</option>
          <option>thursday</option>
          <option>friday</option>
          <option>saturday</option>
          <option>sunday</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Start at</label>
        <select class="form-select" v-model="updateParams.started_at">
          <option>01:00</option>
          <option>03:00</option>
          <option>06:00</option>
          <option>09:00</option>
          <option>12:00</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">End at</label>
        <select class="form-select" v-model="updateParams.ended_at">
          <option>01:00</option>
          <option>03:00</option>
          <option>06:00</option>
          <option>09:00</option>
          <option>12:00</option>
        </select>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateBusinessDay({ updateParams: updateParams, businessDayId: currentId})">Save</button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal],
  data () {
    return {
      createParams: {
        weekday: 'monday',
        started_at: '01:00',
        ended_at: '01:00'
      },
      currentId: '',
      updateParams: {
        weekday: '',
        started_at: '',
        ended_at: ''
      }
    }
  },

  methods: {
    ...mapActions('companyBusinessDays', [
      'fetchBusinessDays',
      'addBusinessDay',
      'deleteBusinessDay',
      'updateBusinessDay'
    ]),
    toggleEditModal (businessDay) {
      this.isEditModalOpen = !this.isEditModalOpen
      this.currentId = businessDay.id
      Object.keys(this.updateParams).forEach(k => { this.updateParams[k] = businessDay[k] })
    }
  },

  computed: {
    ...mapState('companyBusinessDays', [
      'businessDays'
    ])
  },

  created () {
    this.fetchBusinessDays()
  },

  components: {
    SettingLayout
  }
}
</script>
