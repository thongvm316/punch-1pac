<template>
  <main-layout title="Dashboard">
    <div class="columns mt-5">
      <div class="column col-6">
        <div class="box">
          <h2 class="subtitle">Status in month</h2>
          <table class="table no-border">
            <thead>
              <tr>
                <th>Status</th>
                <th>Number of days</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Arrive on time</td>
                <td>13 days</td>
              </tr>
              <tr>
                <td>Leave on time</td>
                <td>10 days</td>
              </tr>
              <tr>
                <td>Arrive late</td>
                <td>3 days</td>
              </tr>
              <tr>
                <td>Leave early</td>
                <td>1 day</td>
              </tr>
              <tr>
                <td>Annual leave</td>
                <td>2 days</td>
              </tr>
              <tr>
                <td>Holiday</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Unpaid leave</td>
                <td>1 day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="column col-6">
        <div class="box">
          <h2 class="subtitle">Chart in month</h2>
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
