<template>
  <footer class="footer">
    <div class="container grid-xl">
      <div class="footer-items">
        <ul class="list-inline">
          <li><img src="../assets/logo.png"></li>
          <li><a href="/tos">{{ $t('footer.terms') }}</a></li>
          <li><a href="/privacy">{{ $t('footer.privacy') }}</a></li>
          <li><a href="/help">{{ $t('footer.help') }}</a></li>
          <li><a href="/contact">{{ $t('footer.contact') }}</a></li>
          <li><a href="/about">{{ $t('footer.about') }}</a></li>
        </ul>
        <span>© 2018 1PAC Vietnam Co.,Ltd</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>
