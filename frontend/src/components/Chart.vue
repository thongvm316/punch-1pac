<template>
  <div>
    <canvas ref="chart" v-if="hasData"></canvas>
    <p v-else>{{ $t('dashboard.chartNoData') }}</p>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState } from 'vuex'

export default {
  name: 'chart',

  props: ['chartData'],

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    hasData () {
      return this.chartData && Object.values(this.chartData).find(val => val)
    }
  },

  mounted () {
    if (this.hasData) {
      const $chart = this.$refs.chart
      const ctx = $chart.getContext('2d')
      this.createChart(ctx, 'doughnut')
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
    }
  }
}
</script>
