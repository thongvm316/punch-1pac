<template>
  <main-layout :title="$t('dashboard.title')" :is-open-announcement="true">
    <div class="columns mt-5">
      <div class="column">
        <div class="box chart">
          <div class="box-header box-header-flex border-bottom">
            <h2>{{ $t('dashboard.chart') }}</h2>
            <attendance-status-select v-model="status"/>
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
import AttendanceStatusSelect from '../components/AttendanceStatusSelect.vue'
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
    Chart,
    AttendanceStatusSelect
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
    ...mapState('chart', [
      'chartData',
      'loaded'
    ])
  }
}
</script>
