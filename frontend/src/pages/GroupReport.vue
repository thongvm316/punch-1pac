<template>
  <main-layout :title="$t('report.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id" />

    <div class="toolbar mt-5 clearfix">
      <div class="float-left">
        <flat-pickr
          :config="{mode: 'range', locale: flatpickrLocaleMapper[pickrLocale]}"
          class="form-input daterange-picker"
          :value="getFormattedInitDateRange()"
          @on-close="onCloseFlatpickr"
        />
        <input
          v-model="searchText"
          type="search"
          class="form-input filter-input"
          :placeholder="$t('placeholder.filterByUser')"
        >
      </div>
      <div
        v-if="isValidTime"
        class="float-right"
      >
        <button
          class="btn btn-success mx-2"
          @click="exportFile($event,{ type: 'zip', requestPath: `/groups/${$route.params.id}/report`, fileName: `report_${group.name}_${params.from_date}-${params.to_date}` })"
        >
          {{ $t('button.group.exportZIPGroupReport') }}
        </button>
        <button
          class="btn btn-success"
          @click="exportFile($event, { type: 'csv', requestPath: `/groups/${$route.params.id}/report`, fileName: `report_${group.name}_${params.from_date}-${params.to_date}` })"
        >
          {{ $t('button.group.exportCSVGroupReport') }}
        </button>
      </div>
    </div>

    <table
      v-if="isValidTime"
      class="table sortable-table bg-light mt-5"
    >
      <thead>
        <th @click="sortBy('name')">
          {{ $t('tableHeader.name') }}
          <svg
            id="Capa_1"
            :class="[{ sorted: sortOrders === 'desc' && sortKey === 'name' }, { show: sortKey === 'name' }]"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 292.362 292.362"
            fillrule="evenodd"
          ><path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" /></svg>
        </th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th
          v-for="(meta, key) in meta.attendance_statuses"
          :key="key"
          @click="sortBy(meta)"
        >
          {{ $t(`meta.attendance_statuses.${meta}`) }}
          <svg
            id="Capa_1"
            :class="[{ sorted: sortOrders === 'desc' && sortKey === meta }, { show: sortKey === meta }]"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 292.362 292.362"
            fillrule="evenodd"
          ><path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428  s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" /></svg>
        </th>
        <th @click="sortBy('working_hours')">
          {{ $t('tableHeader.working_hours') }}
          <svg
            id="Capa_1"
            :class="[{ sorted: sortOrders === 'desc' && sortKey === 'working_hours' }, { show: sortKey === 'working_hours' }]"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 292.362 292.362"
            fillrule="evenodd"
          ><path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428  s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" /></svg>
        </th>
      </thead>

      <tbody>
        <tr
          v-for="result in tmpResults"
          :key="result.id"
        >
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img
                  :src="result.avatar_url"
                  class="avatar avatar-md"
                  :alt="result.name"
                >
              </div>
              <div class="tile-content">
                <router-link :to="`/groups/${$route.params.id}/users/${result.id}/report`">
                  {{ result.name }}
                </router-link>
              </div>
            </div>
          </td>
          <td>{{ result.email }}</td>
          <td><span class="text-lg text-bold-600">{{ result.attend_ok }}</span> / {{ reportMeta.company_total_working_days_in_month }}</td>
          <td><span class="text-lg text-bold-600">{{ result.attend_late }}</span> / {{ reportMeta.company_total_working_days_in_month }}</td>
          <td><span class="text-lg text-bold-600">{{ result.leave_ok }}</span> / {{ reportMeta.company_total_working_days_in_month }}</td>
          <td><span class="text-lg text-bold-600">{{ result.leave_early }}</span> / {{ reportMeta.company_total_working_days_in_month }}</td>
          <td><span class="text-lg text-bold-600">{{ result.leave }}</span> / {{ reportMeta.company_total_working_days_in_month }}</td>
          <td><span class="text-lg text-bold-600">{{ `${result.working_hours.hours}h${result.working_hours.mins}m` }}</span> / {{ `${reportMeta.company_total_working_hours_on_month}h` }}</td>
        </tr>
      </tbody>
    </table>
    <p
      v-else
      class="mt-5"
    >
      {{ $t('groups.report.no_data') }}
    </p>
  </main-layout>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import dateRangePicker from '../mixins/date-range-picker'
import exportCsv from '../mixins/export-csv'
import { mapState, mapActions } from 'vuex'
const MainLayout = () => import('../layouts/Main')
const GroupTab = () => import('../components/GroupTab')
const flatPickr = () => import('vue-flatpickr-component')

export default {

  components: {
    MainLayout,
    GroupTab,
    flatPickr
  },
  mixins: [flatpickrLocale, dateRangePicker, exportCsv],

  data() {
    return {
      searchText: '',
      params: {
        from_date: '',
        to_date: ''
      },
      sortKey: 'name',
      sortOrders: 'asc'
    }
  },

  computed: {
    ...mapState('group', ['group']),

    ...mapState('initialStates', ['meta', 'currentCompany']),

    ...mapState('groupReport', ['results', 'reportMeta']),

    tmpResults() {
      let results = this.results

      if (this.sortKey) {
        results = results.slice().sort((a, b) => {
          let modifier = 1
          if (this.sortOrders === 'desc') modifier = -1
          if (this.sortKey === 'working_hours') {
            const atimestamp = a[this.sortKey].hours * 3600 + a[this.sortKey].mins * 60
            const btimestamp = b[this.sortKey].hours * 3600 + b[this.sortKey].mins * 60
            if (atimestamp < btimestamp) return -1 * modifier
            if (atimestamp > btimestamp) return 1 * modifier
          } else {
            if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier
            if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier
          }
          return 0
        })
      }

      const regex = new RegExp(`${this.searchText.trim()}`, 'gi')
      return this.name ? results.filter(result => (result.name.match(regex)) || result.email.match(regex)) : results
    },

    isValidTime() {
      return this.$moment(this.params.date).isSameOrBefore(this.$moment(), 'month')
    }
  },

  methods: {
    ...mapActions('group', ['getGroup']),

    ...mapActions('groupReport', ['getGroupReport']),

    sortBy(key) {
      this.sortKey = key
      this.sortOrders = this.sortOrders === 'asc' ? 'desc' : 'asc'
    }
  },

  watch: {
    params: {
      handler: function() {
        this.getGroupReport({ group_id: this.$route.params.id, ...this.params })
      },
      deep: true
    }
  },

  created() {
    this.params = this.initDateRange(this.currentCompany.monthly_report)
    this.getGroup(this.$route.params.id)
  }
}
</script>
