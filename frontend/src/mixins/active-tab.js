export default {
  data() {
    return {
      activeTabName: 'Profile'
    }
  },

  methods: {
    setActive(name) {
      if (this.activeTabName === name) return
      this.activeTabName = name
      this.$emit('active', this.activeTabName)
    }
  }
}
