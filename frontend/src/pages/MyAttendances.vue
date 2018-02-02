<template>
  <main-layout :title="$t('title.attendances')">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/attendances/my"><a href="#">{{ $t('attendance.myAttendances') }}</a></router-link>
      <router-link tag="li" class="tab-item" to="/attendances/groups"><a href="#">{{ $t('attendance.groupAttendances') }}</a></router-link>
    </ul>

    <div class="toolbar mt-5">
      <datepicker :placeholder="$t('placeholder.fromDate')"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"/>
      <datepicker
        :placeholder="$t('placeholder.toDate')"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"/>
      <select class="form-select">
        <option>{{ $t('placeholder.filterByStatus') }}</option>
        <option>{{ $t('status.arriveOnTime') }}</option>
        <option>{{ $t('status.leaveOnTime') }}</option>
        <option>{{ $t('status.arriveLate') }}</option>
        <option>{{ $t('status.leaveEarly') }}</option>
        <option>{{ $t('status.holiday') }}</option>
        <option>{{ $t('status.annualLeave') }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.startedAt') }}</th>
        <th>{{ $t('tableHeader.endedAt') }}</th>
        <th>{{ $t('tableHeader.status') }}</th>
      </thead>
      <tbody>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">{{ $t('status.arriveOnTime') }}</span>
            <span class="label label-rounded label-success">{{ $t('status.leaveOnTime') }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination/>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'

export default {
  components: {
    Datepicker,
    MainLayout,
    Pagination
  }
}
</script>
