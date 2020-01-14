<template>
  <div>
    <main>
      <div class="container grid-xl">
        <announcements/>
        <remind-punch-in/>
        <h1 class="title">{{ title }}</h1>
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
const Announcements = () => import('../components/Announcements')
const RemindPunchIn = () => import('../components/RemindPunchIn')

export default {
  name: 'main-layout',

  props: {
    title: String,
    isOpenAnnoucement: Boolean
  },

  components: {
    Announcements,
    RemindPunchIn
  }
}
</script>
