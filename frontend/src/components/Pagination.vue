<template>
  <ul class="pagination mt-4">
    <li class="page-item" v-show="currentPage > 1">
      <a @click="go(n - 1)"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg></a>
    </li>
    <li class="page-item" :class="{ active: n === currentPage }" v-for="n in items">
      <a href="#" @click.prevent="go(n)">{{ n }}</a>
    </li>
    <li class="page-item" v-show="currentPage + 1 <= totalPages">
      <a @click="go(n + 1)"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: ['pager', 'action'],

  data () {
    return {
      currentPage: 1,
      totalPages: null,
      perPage: 20,
      step: 2,
      numItems: 5,
      items: []
    }
  },

  methods: {
    go (n) {
      this.currentPage = n
    },

    buildItems () {
      let items = []
      let first = 1
      let last = this.totalPages
      if (this.currentPage > this.step) {
        first = this.currentPage - this.step
        last = (this.currentPage + this.step <= this.totalPages) ? this.currentPage + this.step : this.totalPages
      }
      for (let i = first; i <= last; i++) {
        items.push(i)
      }
      return items
    }
  },

  watch: {
    currentPage () {
      this.items = this.buildItems()
      document.activeElement.blur()
      this.$store.dispatch(this.action, { page: this.currentPage, per_page: this.perPage })
    }
  },

  mounted () {
    this.currentPage = this.pager.current_page
    this.totalPages = this.pager.total_pages
    this.perPage = this.pager.per_page
    this.items = this.buildItems()
  }
}
</script>
