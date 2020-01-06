<template>
  <ul class="pagination mt-4">
    <li class="page-item" name="page-prev" v-show="pager.current_page > 1">
      <a @click="go(pager.current_page - 1)"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg></a>
    </li>
    <li class="page-item" :class="{ active: n === pager.current_page }" name="page-number" v-for="(n, key) in items" :key="key">
      <a href="#" @click.prevent="go(n)">{{ n }}</a>
    </li>
    <li class="page-item" name="page-next" v-show="pager.current_page + 1 <= pager.total_pages">
      <a @click="go(pager.current_page + 1)"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',

  props: {
    action: {
      type: String,
      required: true
    },
    namespace: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      step: 2,
      items: []
    }
  },

  computed: {
    pager() {
      return this.$store.state[this.namespace].pager
    }
  },

  methods: {
    go(n) {
      document.activeElement.blur()
      this.fetchItems(n)
    },

    buildItems() {
      let items = []
      let first = 1
      let last = this.pager.total_pages
      if (this.pager.current_page > this.step) {
        first = this.pager.current_page - this.step
      }
      last = this.pager.current_page + this.step <= this.pager.total_pages ? this.pager.current_page + this.step : this.pager.total_pages
      for (let i = first; i <= last; i++) {
        items.push(i)
      }
      return items
    },

    fetchItems(page) {
      this.$store.dispatch(`${this.namespace}/${this.action}`, { page, per_page: this.pager.per_page })
    }
  },

  watch: {
    pager: {
      handler: function() {
        this.items = this.buildItems()
      },
      deep: true
    }
  },

  mounted() {
    this.items = this.buildItems()
  }
}
</script>
