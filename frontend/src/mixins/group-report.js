import axios from 'axios'

export default {
  methods: {
    exportFile(event, data) {
      event.target.disabled = true
      axios
        .get(`${data.requestPath}.${data.type}`, {
          headers: { Accept: `application/${data.type}` },
          params: {
            date: this.dateData.date,
            date_type: 'range',
            from_date: this.dateData.from_date,
            to_date: this.dateData.to_date
          },
          responseType: 'blob'
        })
        .then(response => {
          const downloadLink = document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(new Blob([response.data]))
          let fileName = `${data.fileName}.${data.type}`
          downloadLink.setAttribute('download', fileName)
          document.body.appendChild(downloadLink)
          downloadLink.click()

          event.target.disabled = false
          downloadLink.remove()
        })
        .catch(error => {
          event.target.disabled = false
          throw error
        })
    },

    initDateRange(currentCompanyMonthlyDateReport) {
      const defaultMonthlyReportDay = 1

      if (parseInt(currentCompanyMonthlyDateReport) === defaultMonthlyReportDay) {
        return {
          from_date: this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
          to_date: this.$moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        }
      } else if (parseInt(currentCompanyMonthlyDateReport) > 28 &&
                (this.$moment().month() === 1 || this.$moment().month() === 2)) {
        return {
          from_date: this.$moment().startOf('month').format('YYYY-MM-DD'),
          to_date: this.$moment().endOf('month').format('YYYY-MM-DD')
        }
      } else {
        return {
          from_date: this.$moment().subtract(1, 'months').date(currentCompanyMonthlyDateReport).add(1, 'days').format('YYYY-MM-DD'),
          to_date: this.$moment().date(currentCompanyMonthlyDateReport).format('YYYY-MM-DD')
        }
      }
    },

    getFormattedInitDateRange() {
      const dateRange = this.initDateRange(this.currentCompany.company_monthly_report)
      return `${dateRange.from_date} to ${dateRange.to_date}`
    },

    onCloseFlatpickr(dates) {
      this.dateData.from_date = this.$moment(dates[0]).format('YYYY-MM-DD')
      this.dateData.to_date = this.$moment(dates[1]).format('YYYY-MM-DD')
    }
  },

  created() {
    this.dateData = this.initDateRange(this.currentCompany.company_monthly_report)
  }
}
