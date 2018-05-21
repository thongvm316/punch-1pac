import moment from 'moment-timezone'

moment.tz.setDefault(window.initialStates().company.timezone)
moment.updateLocale('en', {
  longDateFormat: {
    'L': 'MMM DD',
    'LL': 'MMM DD, YYYY',
    'LLL': 'MMM YYYY',
    'LLLL': 'MMM DD YYYY, HH:mm'
  }
})

moment.updateLocale('vi', {
  monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  weekdaysShort: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  longDateFormat: {
    'L': 'D MMMM',
    'LL': 'D MMMM, YYYY',
    'LLL': 'MMM YYYY',
    'LLLL': 'D MMMM YYYY, HH:mm'
  }
})

moment.updateLocale('ja', {
  monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekdaysShort: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  longDateFormat: {
    'L': 'M月D日',
    'LL': 'Y年M月D日',
    'LLL': 'Y年M月',
    'LLLL': 'Y年M月D日 HH:mm'
  }
})
moment.locale(window.initialStates().user.language || 'en')

export default moment
