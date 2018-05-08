import moment from 'moment-timezone'

moment.tz.setDefault(window.initialStates().company.timezone)
moment.updateLocale('en', {
  longDateFormat: {
    'L': 'MMM DD',
    'LL': 'MMM DD, YYYY',
    'LLL': 'MMM D, hh:mm',
    'LLLL': 'MMM DD YYYY, HH:mm'
  }
})

moment.updateLocale('vi', {
  monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  weekdaysShort: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  longDateFormat: {
    'L': 'D MMMM',
    'LL': 'D MMMM, YYYY',
    'LLL': 'D MMMM, hh:mm',
    'LLLL': 'D MMMM YYYY, HH:mm'
  }
})
moment.locale(window.initialStates().user.language || 'en')

export default moment
