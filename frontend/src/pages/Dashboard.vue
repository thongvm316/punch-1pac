<template>
  <main-layout :title="$t('dashboard.title')">
    <div class="columns mt-5">
      <div class="column">
        <div class="box chart">
          <div class="box-header box-header-flex border-bottom">
            <h2>{{ $t('dashboard.chart') }}</h2>
            <select class="form-select" v-model="status">
              <option :value="status" v-for="status in meta.attendanceStatuses">{{ $t(`meta.attendanceStatuses.${status}`) }}</option>
            </select>
          </div>
          <div class="box-content">
            <chart :chartData="chartData" v-if="loaded"></chart>
          </div>
        </div>
      </div>
    </div>

    <div class="box mt-5">
      <h2 class="subtitle">{{ $t('dashboard.calendar') }}</h2>
      <full-calendar></full-calendar>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import FullCalendar from '../components/FullCalendar.vue'
import Chart from '../components/Chart.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      status: 'attend_ok'
    }
  },

  methods: {
    ...mapActions('chart', [
      'getChart',
      'resetChart'
    ])
  },

  components: {
    MainLayout,
    FullCalendar,
    Chart
  },

  created () {
    this.getChart(this.status)
  },

  watch: {
    status: function () {
      this.resetChart()
      this.getChart(this.status)
    }
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('chart', [
      'chartData',
      'loaded'
    ])
  }
}
</script>
