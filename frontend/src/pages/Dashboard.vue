<template>
  <main-layout title="Dashboard">
    <div class="box mt-5">
      <div class="box-header border-bottom clearfix">
        <h2 class="d-inline-block">Chart in month</h2>
        <select class="form-select float-right">
          <option>{{ $t('message.dashboard.arriveOnTime') }}</option>
          <option>{{ $t('message.dashboard.leaveOnTime') }}</option>
          <option>{{ $t('message.dashboard.arriveLate') }}</option>
          <option>{{ $t('message.dashboard.leaveEarly') }}</option>
          <option>{{ $t('message.dashboard.annualLeave') }}</option>
          <option>{{ $t('message.dashboard.holiday') }}</option>
          <option>{{ $t('message.dashboard.unpaidLeave') }}</option>
        </select>
      </div>
      <div class="box-content">
        <chart></chart>
      </div>
    </div>
    <div class="box mt-5">
      <h2 class="subtitle">Calendar</h2>
      <full-calendar></full-calendar>
      <div class="mt-2">
        <div class="chip bg-light">
          <span class="circle bg-primary mr-2"></span>
          Arrive on time
        </div>
        <div class="chip bg-light">
          <span class="circle bg-success mr-2"></span>
          Leave on time
        </div>
        <div class="chip bg-light">
          <span class="circle bg-error mr-2"></span>
          Unpaid leave
        </div>
        <div class="chip bg-light">
          <span class="circle bg-warning mr-2"></span>
          Annual leave
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
