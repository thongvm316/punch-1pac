<template>
  <ul class="tab mt-4">
    <router-link
      tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/users`"
      exact
    >
      <a href="#">{{ $t('group.users') }}</a>
    </router-link>
    <router-link
      v-if="hasUser"
      tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/attendances`"
    >
      <a href="#">{{ $t('group.attendances') }}</a>
    </router-link>
    <router-link
      v-if="hasUser"
      tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/requests`"
    >
      <a href="#">{{ $t('group.requests') }}</a>
    </router-link>
    <router-link
      v-if="hasUser"
      tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/report`"
    >
      <a href="#">{{ $t('group.report') }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'GroupTab',

  props: {
    groupId: {
      type: String,
      required: true
    },

    hasUser: {
      type: Boolean,
      default: true
    }
  }
}
</script>
