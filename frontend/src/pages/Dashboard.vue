<template>
  <main-layout :title="$t('title.dashboard')">
    <div class="columns mt-5">
      <div class="column col-6">
        <div class="box chart">
          <div class="box-header box-header-flex border-bottom">
            <h2>{{ $t('dashboard.chartInMonth') }}</h2>
            <select class="form-select" v-model="status">
              <option value="attend_ok">{{ $t('status.arriveOnTime') }}</option>
              <option value="leave_ok">{{ $t('status.leaveOnTime') }}</option>
              <option value="attend_late">{{ $t('status.arriveLate') }}</option>
              <option value="leave_early">{{ $t('status.leaveEarly') }}</option>
              <option value="annual_leave">{{ $t('status.annualLeave') }}</option>
              <option value="holiday">{{ $t('status.holiday') }}</option>
            </select>
          </div>
          <div class="box-content">
            <chart :chartData="chartData" v-if="loaded"></chart>
          </div>
        </div>
      </div>
    </div>
    <div class="box mt-5">
      <h2 class="subtitle">{{ $t('title.calendar') }}</h2>
      <full-calendar></full-calendar>
      <!--<div class="mt-2">-->
        <!--<div class="chip bg-light">-->
          <!--<span class="circle bg-primary mr-2"></span>-->
          <!--{{ $t('status.arriveOnTime') }}-->
        <!--</div>-->
        <!--<div class="chip bg-light">-->
          <!--<span class="circle bg-success mr-2"></span>-->
          <!--{{ $t('status.leaveOnTime') }}-->
        <!--</div>-->
        <!--<div class="chip bg-light">-->
          <!--<span class="circle bg-error mr-2"></span>-->
          <!--{{ $t('status.unpaidLeave') }}-->
        <!--</div>-->
        <!--<div class="chip bg-light">-->
          <!--<span class="circle bg-warning mr-2"></span>-->
          <!--{{ $t('status.annualLeave') }}-->
        <!--</div>-->
      <!--</div>-->
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
    ...mapState('chart', [
      'chartData',
      'loaded'
    ])
  }
}
</script>
