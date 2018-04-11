<template>
  <div class="box chart">
    <div class="box-header box-header-flex border-bottom">
      <h2>{{ $t('dashboard.chart') }}</h2>
      <datepicker
        :language="currentUser.language"
        :format="'MMM yyyy'"
        :minimumView="'month'"
        :maximumView="'month'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="chartDate"/>
    </div>
    <p v-if="!hasData">{{ $t('dashboard.chartNoData') }}</p>
    <div class="box-content">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Chart from 'chart.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'chart',

  components: {
    Datepicker
  },

  data () {
    return {
      chartDate: this.$moment().locale('en').format('LL')
    }
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('chart', [
      'chartData'
    ]),

    hasData () {
      return this.chartData && Object.values(this.chartData).find(val => val)
    }
  },

  created () {
    this.getChart(this.chartDate)
  },

  mounted () {
    if (this.hasData) {
      const $chart = this.$refs.chart
      const ctx = $chart.getContext('2d')
      this.createChart(ctx, 'doughnut')
    }
  },

  watch: {
    chartDate: function () {
      this.getChart(this.$moment(this.chartDate).locale('en').format('LL'))
    },

    chartData: function () {
      if (this.hasData) {
        const $chart = this.$refs.chart
        const ctx = $chart.getContext('2d')
        this.createChart(ctx, 'doughnut')
      }
    }
  },

  methods: {
    createChart (canvas, type) {
      return new Chart(canvas, {
        type: type,
        data: {
          labels: Object.keys(this.chartData).filter(status => this.chartData[status]).map(status => this.$t(`meta.attendance_statuses.${status}`)),
          datasets: [{
            data: Object.values(this.chartData).filter(count => count),
            backgroundColor: ['#2d91ff', '#ff3b30', '#4cd964', '#ffb200', '#f0f1f4']
          }]
        },
        options: {
          responsive: true,
          animation: {
            animateScale: true
          },
          legend: {
            position: 'right'
          }
        }
      })
    },

    ...mapActions('chart', [
      'getChart'
    ])
  }
}
</script>
