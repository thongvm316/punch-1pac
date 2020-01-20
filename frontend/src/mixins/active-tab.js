export default {
  data() {
    return {
      activeTabName: 'profile'
    }
  },

  methods: {
    setActive(name) {
      this.activeTabName = name
      this.$emit('activeTab', name)
    }
  }
}
