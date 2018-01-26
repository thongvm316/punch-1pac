<template>
  <main-layout>
    <h1>Announcements</h1>
    <table class="table table-hover mt-5 bg-light">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Sent at</th>
        </tr>
      </thead>
      <tbody>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
        <router-link to="/announcements/1" tag="tr">
          <td>Server maintanence</td>
          <td>Normal</td>
          <td>20-01-2018 23:22</td>
        </router-link>
      </tbody>
    </table>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'

export default {
  components: {
    MainLayout
  }
}
</script>
