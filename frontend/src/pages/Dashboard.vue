<template>
  <main-layout :title="$t('dashboard.title')" :is-open-announcement="true">
    <div class="box mt-5">
      <h2 class="subtitle">{{ $t('dashboard.calendar') }}</h2>
      <full-calendar></full-calendar>
    </div>
    <div class="columns mt-5">
      <div class="column col-6">
        <div class="box chart">
          <div class="box-header box-header-flex border-bottom">
            <h2>{{ $t('dashboard.chart') }}</h2>
            <datepicker
              :format="'MMM yyyy'"
              :minimumView="'month'"
              :maximumView="'month'"
              :input-class="'datepicker-input form-input'"
              :calendar-class="'datepicker-calendar'"
              :wrapper-class="'datepicker'"
              v-model="chartDate"/>
          </div>
          <div class="box-content">
            <chart :chartData="chartData" v-if="loaded"></chart>
          </div>
        </div>
      </div>
      <div class="column col-6">
        <div class="box">
          <h2 class="subtitle">{{ $t('dashboard.recentActivities') }}</h2>
          <div class="notifications">
            <ul>
              <li class="px-0" v-for="activity in activities">
                <div class="tile tile-centered tile-activity">
                  <div class="tile-icon">
                    <img :src="activity.user.avatar_url" class="avatar avatar-md" :alt="activity.user.name">
                  </div>
                  <div class="tile-content">
                    <p class="tile-title" v-html="$t(`activity.${activity.activitable_type.toLowerCase()}.${activity.kind}`, { name: activity.user.name })"></p>
                    <p class="tile-subtitle">{{ activity.created_at | moment_activity }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="text-center" v-if="pager.next_page">
            <button type="button" class="btn btn-block" @click="getMoreActivities({ page: pager.next_page })">View more activities</button>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import FullCalendar from '../components/FullCalendar.vue'
import AttendanceStatusSelect from '../components/AttendanceStatusSelect.vue'
import Chart from '../components/Chart.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      status: 'attend_ok',
      chartDate: this.$moment().locale('en').format('LL')
    }
  },

  methods: {
    ...mapActions('chart', [
      'getChart',
      'resetChart'
    ]),

    ...mapActions('activities', [
      'getActivities',
      'getMoreActivities'
    ])
  },

  components: {
    Datepicker,
    MainLayout,
    FullCalendar,
    Chart,
    AttendanceStatusSelect
  },

  created () {
    this.getChart(this.chartDate)
    this.getActivities()
  },

  watch: {
    chartDate: function () {
      this.resetChart()
      this.getChart(this.$moment(this.chartDate).locale('en').format('LL'))
    }
  },

  computed: {
    ...mapState('chart', [
      'chartData',
      'loaded'
    ]),

    ...mapState('activities', [
      'pager',
      'activities'
    ])
  }
}
</script>
