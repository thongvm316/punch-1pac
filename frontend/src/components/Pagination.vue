<template>
  <ul class="pagination mt-4">
    <li class="page-item" v-show="currentPage > 1">
      <a @click="back"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg></a>
    </li>
    <li class="page-item" :class="{ active: isCurrentPage(n) }" v-for="n in items">
      <a href="#" @click.prevent="go(n)">{{ n }}</a>
    </li>
    <li class="page-item" v-show="currentPage + 1 <= totalPage">
      <a @click="next"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',

  data () {
    return {
      currentPage: 1,
      totalCount: 69,
      perPage: 5,
      step: 2,
      items: [1, 2, 3, 4, 5]
    }
  },

  methods: {
    back () {
      this.currentPage -= 1
    },

    next () {
      this.currentPage += 1
    },

    go (n) {
      this.currentPage = n
    },

    isCurrentPage (n) {
      return this.currentPage === n
    }
  },

  computed: {
    totalPage () {
      return Math.ceil(this.totalCount / this.perPage)
    }
  },

  watch: {
    currentPage () {
      if (this.currentPage > this.step) {
        const first = this.currentPage - this.step
        const last = (this.currentPage + this.step <= this.totalPage) ? this.currentPage + this.step : this.totalPage
        let items = []
        for (let i = first; i <= last; i++) {
          items.push(i)
        }
        document.activeElement.blur()
        this.items = items
      }
    }
  }
}
</script>
