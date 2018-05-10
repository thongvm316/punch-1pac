<template>
  <div class="month-year-picker">
    <div class="month-year-picker-result" @click="togglePicker">
      {{ this.monthFormat }}
    </div>
    <div class="month-year-picker-content" v-show="isOpenMonthYearPicker" ref="result">
      <div class="month-year-picker-control">
        <span :class="{ 'active': (isOpenMonthYearPicker && isMonthPicker) }" @click="monthPicker">Month</span>
        <span :class="{ 'active': (isOpenMonthYearPicker && !isMonthPicker)}" @click="yearPicker">Year</span>
      </div>
      <datepicker
        :inline="true"
        :language="currentUser.language"
        :minimumView="isMonthPicker ? 'month' : 'year'"
        :maximumView="isMonthPicker ? 'month' : 'year'"
        :input-class="'form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="month"
        @input="onInputDatepicker" />
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'month-year-picker',

  data () {
    return {
      month: this.$moment().locale('en').format('YYYY-MM-DD'),
      isMonthPicker: true,
      isOpenMonthYearPicker: false
    }
  },

  components: {
    Datepicker
  },

  computed: {
    monthFormat () {
      return this.isMonthPicker ? this.$moment(this.month).format('MMM YYYY') : this.$moment(this.month).format('YYYY')
    }
  },

  methods: {
    togglePicker (event) {
      event.stopPropagation()
      this.isOpenMonthYearPicker = !this.isOpenMonthYearPicker
      const elResult = this.$refs.result

      if (!document.onclick) {
        document.onclick = (e) => {
          const target = e.target
          if ((target !== elResult.className) && (!elResult.contains(target))) {
            this.isOpenMonthYearPicker = false
          }
        }
      }
    },

    onInputDatepicker () {
      this.month = this.$moment(this.month).format('YYYY-MM-DD')
      this.$emit('input', this.monthFormat)
      this.isOpenMonthYearPicker = false
    },

    monthPicker (e) {
      this.isMonthPicker = true
      this.$emit('input', this.monthFormat)
    },

    yearPicker (e) {
      this.isMonthPicker = false
      this.$emit('input', this.monthFormat)
    }
  }
}
</script>
