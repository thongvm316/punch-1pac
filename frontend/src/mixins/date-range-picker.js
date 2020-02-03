export default {
  methods: {
    initDateRange(currentCompanyMonthlyDateReport) {
      const defaultMonthlyReportDay = 1

      if (parseInt(currentCompanyMonthlyDateReport) === defaultMonthlyReportDay) {
        return {
          from_date: this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
          to_date: this.$moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        }
      }

      if (parseInt(currentCompanyMonthlyDateReport) > 28 &&
        (this.$moment().month() === 1 || this.$moment().month() === 2)) {
        return {
          from_date: this.$moment().startOf('month').format('YYYY-MM-DD'),
          to_date: this.$moment().endOf('month').format('YYYY-MM-DD')
        }
      }

      return {
        from_date: this.$moment().subtract(1, 'months').date(currentCompanyMonthlyDateReport).add(1, 'days').format('YYYY-MM-DD'),
        to_date: this.$moment().date(currentCompanyMonthlyDateReport).format('YYYY-MM-DD')
      }
    },

    getFormattedInitDateRange() {
      let dateRange = this.currentCompany
        ? this.initDateRange(this.currentCompany.monthly_report)
        : {
          from_date: this.$moment().format('YYYY-MM-DD'),
          to_date: this.$moment().format('YYYY-MM-DD')
        }

      return `${dateRange.from_date}${this.$t('flatpickr.rangeSeparator')}${dateRange.to_date}`
    },

    onCloseFlatpickr(dates) {
      this.params.from_date = this.$moment(dates[0]).format('YYYY-MM-DD')
      this.params.to_date = this.$moment(dates[1]).format('YYYY-MM-DD')
    }
  }
}
