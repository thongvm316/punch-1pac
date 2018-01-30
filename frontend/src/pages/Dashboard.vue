<template>
  <main-layout title="Dashboard">
    <div class="columns mt-5">
      <div class="column col-6">
        <div class="box">
          <h2 class="subtitle">{{ $t('message.statusInMonth') }}</h2>
          <table class="table no-border">
            <thead>
              <tr>
                <th>{{ $t('message.status') }}</th>
                <th>{{ $t('message.statusInMonth') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ $t('message.arriveOnTime') }}</td>
                <td>{{ $tc('message.day', 13, {count: 13}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.leaveOnTime') }}</td>
                <td>{{ $tc('message.day', 10, {count: 10}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.arriveLate') }}</td>
                <td>{{ $tc('message.day', 3, {count: 3}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.leaveEarly') }}</td>
                <td>{{ $tc('message.day', 1) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.annualLeave') }}</td>
                <td>{{ $tc('message.day', 2, {count: 2}) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.holiday') }}</td>
                <td>{{ $tc('message.day', 0) }}</td>
              </tr>
              <tr>
                <td>{{ $t('message.unpaidLeave') }}</td>
                <td>{{ $tc('message.day', 1) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="column col-6">
        <div class="box">
          <h2 class="subtitle">{{ $t('message.chartInMonth') }}</h2>
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
  components: {
    MainLayout,
    FullCalendar
  }
}
</script>
