<template>
  <ul class="tab mt-4">
    <router-link tag="li" class="tab-item" to="/attendances/my"><a href="#">{{ $t('attendances.tab.my') }}</a></router-link>
    <router-link tag="li" class="tab-item" to="/attendances/groups" v-if="isManagers()"><a href="#">{{ $t('attendances.tab.group') }}</a></router-link>
  </ul>
</template>

<script>
import authorization from '../mixins/authorization'

export default {
  name: 'attendances-tab',
  mixins: [authorization]
}
</script>
