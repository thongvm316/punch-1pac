<template>
  <div style="height: 300px;">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chart',
  data () {
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },

  props: ['chartData'],

  mounted () {
    const $chart = this.$refs.chart
    const ctx = $chart.getContext('2d')
    this.createChart(ctx, 'line')
  },

  methods: {
    createChart (canvas, type) {
      return new Chart(canvas, {
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
              data: this.chartData
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
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
