<template>
  <main-layout :title="$t('attendances.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id"/>

    <div class="toolbar mt-5">
      <datepicker
        :language="currentUser.language"
        :format="function (date) { return $moment(date).format('MMM YYYY') }"
        :minimumView="'month'"
        :maximumView="'month'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        @input="onInputDatepicker"
        v-model="month"/>
      <v-select label="email" :placeholder="$t('attendances.placeholder.filterByUser')" v-model="selectedUser" :options="usersInGroup" @input="filterUser">
        <template slot="option" slot-scope="option">
          <div class="tile tile-centered">
            <div class="tile-icon">
              <img :src="option.avatar_url" class="avatar avatar-md">
            </div>
            <div class="tile-content">{{ option.email }} ({{ option.name }})</div>
          </div>
        </template>
      </v-select>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('attendances.tableHeader.name') }}</th>
        <th v-for="meta in meta.attendance_statuses">{{ $t(`meta.attendance_statuses.${meta}`) }}</th>
      </thead>
      <tbody>
        <tr v-for="result in tmpResults">
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img :src="result.avatar_url" class="avatar avatar-md" :alt="result.name">
              </div>
              <div class="tile-content">{{ result.name }}</div>
            </div>
          </td>
          <td>{{ result.attend_ok }}</td>
          <td>{{ result.attend_late }}</td>
          <td>{{ result.leave_ok }}</td>
          <td>{{ result.leave_early }}</td>
          <td>{{ result.annual_leave }}</td>
        </tr>
      </tbody>
    </table>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main'
import GroupTab from '../components/GroupTab'
import vSelect from 'vue-select'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      selectedUser: null,
      month: this.$moment().format('LL'),
      tmpResults: []
    }
  },

  components: {
    MainLayout,
    GroupTab,
    Datepicker,
    vSelect
  },

  computed: {
    ...mapState('groupAttendances', [
      'usersInGroup'
    ]),

    ...mapState('group', [
      'group'
    ]),

    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('groupReport', [
      'results'
    ])
  },

  methods: {
    ...mapActions('groupAttendances', [
      'getUsersInGroup'
    ]),

    ...mapActions('group', [
      'getGroup'
    ]),

    ...mapActions('groupReport', [
      'getReport'
    ]),

    onInputDatepicker () {
      this.month = this.$moment(this.month).format('YYYY-MM-DD')
    },

    filterUser () {
      if (this.selectedUser) {
        this.tmpResults = this.results.filter(result => result.id === this.selectedUser.id)
      } else {
        this.tmpResults = this.results
      }
    }
  },

  created () {
    this.getReport({ group_id: this.$route.params.id, date: this.month }).then(response => { this.tmpResults = response.data })
    this.getGroup(this.$route.params.id)
    this.getUsersInGroup(this.$route.params.id)
  },

  watch: {
    month: function () {
      this.getReport({ group_id: this.$route.params.id, date: this.month })
    }
  }
}
</script>
