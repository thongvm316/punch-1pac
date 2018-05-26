import l10n from 'flatpickr/dist/l10n'

export default {
  data() {
    return {
      flatpickrLocaleMapper: Object.assign(
        {
          vi: l10n.vn,
          ja: l10n.ja,
          en: l10n.en
        },
        {
          vi: {
            weekdays: {
              shorthand: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
              longhand: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
            },
            months: {
              shorthand: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
              longhand: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },
            rangeSeparator: this.$t('flatpickr.rangeSeparator')
          },
          ja: {
            weekdays: {
              shorthand: ['日', '月', '火', '水', '木', '金', '土'],
              longhand: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
            },
            months: {
              shorthand: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              longhand: ['1 /', '2 /', '3 /', '4 /', '5 /', '6 /', '7 /', '8 /', '9 /', '10 /', '11 /', '12 /']
            },
            rangeSeparator: this.$t('flatpickr.rangeSeparator')
          },
          en: {
            rangeSeparator: this.$t('flatpickr.rangeSeparator')
          }
        }
      )
    }
  },

  methods: {
    flatpickrFormat(currentUser) {
      switch (this.$moment().locale(currentUser.language)) {
        case 'ja':
          return 'Y年n月j日'
        default:
          return 'Y-m-d'
      }
    }
  }
}
