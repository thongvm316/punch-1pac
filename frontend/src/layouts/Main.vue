<template>
  <main>
    <div class="container grid-xl">
      <announcements />
      <remind-punch-in />
      <h1 class="title">
        {{ title }}
      </h1>
      <slot />
    </div>
  </main>
</template>

<script>
const Announcements = () => import('../components/Announcements')
const RemindPunchIn = () => import('../components/RemindPunchIn')

export default {
  name: 'MainLayout',

  components: {
    Announcements,
    RemindPunchIn
  },

  props: {
    title: String,
    isOpenAnnoucement: Boolean
  }
}
</script>
