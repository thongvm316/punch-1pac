export default {
  data () {
    return {
      isDropdownActive: false
    }
  },

  methods: {
    closeDropdown (e) {
      const el = this.$refs.dropdownMenu
      const target = e.target
      if ((el !== target) && (!el.contains(target))) {
        this.isDropdownActive = false
      }
    }
  },

  created () {
    document.addEventListener('click', this.closeDropdown)
  },

  destroyed () {
    document.removeEventListener('click', this.closeDropdown)
  }
}
