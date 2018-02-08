export default {
  data () {
    return {
      isDropdownActive: false
    }
  },

  methods: {
    documentClick (e) {
      const el = this.$refs.dropdownMenu
      const target = e.target
      if ((el !== target) && (!el.contains(target))) {
        this.isDropdownActive = false
      }
    }
  },

  created () {
    document.addEventListener('click', this.documentClick)
  },

  destroyed () {
    document.removeEventListener('click', this.documentClick)
  }
}
