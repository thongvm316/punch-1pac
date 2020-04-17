<template>
  <ul class="pagination mt-4">
    <li
      v-show="pager.current_page > 1"
      ref="pagePrev"
      class="page-item"
    >
      <a @click="go(pager.current_page - 1)">
        <p-ico-prev-arrow />
      </a>
    </li>
    <li
      v-for="(n, key) in items"
      ref="pageNumber"
      :key="key"
      class="page-item"
      :class="{ active: n === pager.current_page }"
    >
      <a
        href="#"
        @click.prevent="go(n)"
      >{{ n }}</a>
    </li>
    <li
      v-show="pager.current_page + 1 <= pager.total_pages"
      ref="pageNext"
      class="page-item"
    >
      <a @click="go(pager.current_page + 1)">
        <p-ico-next-arrow />
      </a>
    </li>
  </ul>
</template>

<script>
import PIcoPrevArrow from '@/punch-ui/punch-icons/PIcoPrevArrow'
import PIcoNextArrow from '@/punch-ui/punch-icons/PIcoNextArrow'

export default {
  name: 'Pagination',

  components: {
    PIcoPrevArrow,
    PIcoNextArrow
  },

  props: {
    action: {
      type: String,
      required: true
    },
    namespace: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: false,
      default() {
        return {}
      }
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
      this.$store.dispatch(`${this.namespace}/${this.action}`, { page, per_page: this.pager.per_page, ...this.params })
    }
  }
}
</script>
