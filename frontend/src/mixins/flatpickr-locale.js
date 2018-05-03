import l10n from 'flatpickr/dist/l10n'

export default {
  data () {
    return {
      flatpickrLocaleMapper: Object.assign({
        vi: l10n.vn,
        ja: l10n.ja,
        en: l10n.en
      }, {
        vi: {
          rangeSeparator: this.$t('flatpickr.rangeSeparator')
        },
        ja: {
          rangeSeparator: this.$t('flatpickr.rangeSeparator')
        },
        en: {
          rangeSeparator: this.$t('flatpickr.rangeSeparator')
        }
      })
    }
  }
}
