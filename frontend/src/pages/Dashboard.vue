<template>
  <main-layout :title="$t('title.dashboard')">
    <div class="columns mt-5">
      <div class="column col-6">
        <div class="box">
          <div class="box-header box-header-flex border-bottom">
            <h2>{{ $t('dashboard.chartInMonth') }}</h2>
            <select class="form-select">
              <option>{{ $t('status.arriveOnTime') }}</option>
              <option>{{ $t('status.leaveOnTime') }}</option>
              <option>{{ $t('status.arriveLate') }}</option>
              <option>{{ $t('status.leaveEarly') }}</option>
              <option>{{ $t('status.annualLeave') }}</option>
              <option>{{ $t('status.holiday') }}</option>
              <option>{{ $t('status.unpaidLeave') }}</option>
            </select>
          </div>
          <div class="box-content">
            <chart></chart>
          </div>
        </div>
      </div>
    </div>
    <div class="box mt-5">
      <h2 class="subtitle">{{ $t('title.calendar') }}</h2>
      <full-calendar></full-calendar>
      <div class="mt-2">
        <div class="chip bg-light">
          <span class="circle bg-primary mr-2"></span>
          {{ $t('status.arriveOnTime') }}
        </div>
        <div class="chip bg-light">
          <span class="circle bg-success mr-2"></span>
          {{ $t('status.leaveOnTime') }}
        </div>
        <div class="chip bg-light">
          <span class="circle bg-error mr-2"></span>
          {{ $t('status.unpaidLeave') }}
        </div>
        <div class="chip bg-light">
          <span class="circle bg-warning mr-2"></span>
          {{ $t('status.annualLeave') }}
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import FullCalendar from '../components/FullCalendar.vue'
import Chart from '../components/Chart.vue'

export default {
  data () {
    return {
      locale: 'en'
    }
  },
  components: {
    MainLayout,
    FullCalendar,
    Chart
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
