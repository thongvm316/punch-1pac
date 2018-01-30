<template>
  <main-layout title="Dashboard">
    <div class="columns mt-5">
      <div class="column col-6">
        <div class="box">
          <label for="locale">Lang</label>
          <select v-model="locale">
            <option>en</option>
            <option>ja</option>
            <option>vi</option>
          </select>
          <h2 class="subtitle">{{ $t('message.dashboard.statusInMonth') }}</h2>
          <table class="table no-border">
            <thead>
              <tr>
                <th>{{ $t('message.dashboard.status') }}</th>
                <th>{{ $t('message.dashboard.statusInMonth') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ $t('message.dashboard.arriveOnTime') }}</td>
                <td>{{ $tc('message.dashboard.day', 13, {count: 13}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.dashboard.leaveOnTime') }}</td>
                <td>{{ $tc('message.dashboard.day', 10, {count: 10}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.dashboard.arriveLate') }}</td>
                <td>{{ $tc('message.dashboard.day', 3, {count: 3}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.dashboard.leaveEarly') }}</td>
                <td>{{ $tc('message.dashboard.day', 1) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.dashboard.annualLeave') }}</td>
                <td>{{ $tc('message.dashboard.day', 2, {count: 2}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.dashboard.holiday') }}</td>
                <td>{{ $tc('message.dashboard.day', 0) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.dashboard.unpaidLeave') }}</td>
                <td>{{ $tc('message.dashboard.day', 1) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="column col-6">
        <div class="box">
          <h2 class="subtitle">{{ $t('message.dashboard.chartInMonth') }}</h2>
          <div class="mt-4">
            <img class="img-responsive" src="../assets/chart.png">
          </div>
        </div>
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

export default {
  data () {
    return {
      locale: 'en'
    }
  },
  components: {
    MainLayout,
    FullCalendar
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
