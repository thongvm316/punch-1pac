<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chart',
  data () {
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      data: [13, 20, 25, 22, 12, 18, 13, 24, 10, 22, 12, 30]
    }
  },

  mounted () {
    var chart = this.$refs.chart
    var ctx = chart.getContext('2d')
    this.createChart(ctx, 'line')
  },

  methods: {
    createChart (canvas, type) {
      var newChart = new Chart(canvas, {
        type: type,
        data: {
          labels: this.labels,
          datasets: [
            {
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
              borderColor: 'rgba(75, 192, 192, 1)',
              lineTension: 0,
              pointBorderWidth: 5,
              pointHoverRadius: 5,
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 1,
              data: this.data
            }
          ]
        },
        options: {
          animation: {
            animateScale: true
          },
          legend: {
            display: false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  canvas {
    width: 100%;
  }
</style>
