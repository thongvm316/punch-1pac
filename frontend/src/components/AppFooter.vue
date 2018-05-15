<template>
  <footer class="footer">
    <div class="container grid-xl">
      <div class="footer-items">
        <ul class="list-inline">
          <li><img src="../assets/logo.png"></li>
          <li><a :href="`${meta.base_url}/terms`">{{ $t('footer.terms') }}</a></li>
          <li><a :href="`${meta.base_url}/privacy`">{{ $t('footer.privacy') }}</a></li>
          <li><a :href="`${meta.base_url}/help`">{{ $t('footer.help') }}</a></li>
          <li><a :href="`${meta.base_url}/contact`">{{ $t('footer.contact') }}</a></li>
          <li><a :href="`${meta.base_url}/about`">{{ $t('footer.about') }}</a></li>
        </ul>
        <span>© 2018 1PAC Vietnam Co.,Ltd</span>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-footer',

  computed: {
    ...mapState('initialStates', [
      'meta'
    ])
  }
}
</script>
