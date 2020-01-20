<template>
  <form class="setting-form">
    <div class="form-group" :class="{ 'has-error': $v.params.name.$error || errors.name }">
      <label class="form-label">{{ $t('label.name') }}</label>
      <input class="form-input" type="text" :placeholder="$t('placeholder.name')" v-model="$v.params.name.$model">
      <p class="form-input-hint" v-if="$v.params.name.$error && !errors.name">
        {{ $t('validation.required', { name: $t('label.name') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.name">{{ $t('label.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error':  $v.params.email.$anyError || errors.email }">
      <label class="form-label">{{ $t('label.email') }}</label>
      <input class="form-input" type="text" :placeholder="$t('placeholder.email')" v-model="$v.params.email.$model">
      <p class="form-input-hint" v-if="$v.params.email.$anyError && !errors.email">
        <span v-if="!$v.params.email.required">{{ $t('validation.required', { name: $t('label.email') }) }}</span>
        <span v-if="!$v.params.email.email">{{ $t('validation.invalid', { name: $t('label.email') }) }}</span>
      </p>
      <p class="form-input-hint" v-if="errors.email">{{ $t('label.email') }} {{ errors.email[0] }}</p>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.role') }}</label>
      <select class="form-select" v-model="params.role">
        <option :value="role" v-for="(role, key) in meta.roles" :key="key">{{ $t(`meta.roles.${role}`) }}</option>
      </select>
    </div>
    <div class="form-group" :class="{ 'has-error':  $v.params.group_id.$error || errors.group }">
      <label class="form-label">{{ $t('label.group') }}</label>
      <group-select v-model="$v.params.group_id.$model">
        <option slot="placeholder" value="">{{ $t('placeholder.chooseGroup') }}</option>
      </group-select>
      <p class="form-input-hint" v-if="$v.params.group_id.$error && !errors.group">
        {{ $t('validation.required', { name: $t('label.group') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.group">{{ $t('label.group') }} {{ errors.group[0] }}</p>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="create(params)" :disabled="isDisabled">{{ $t('button.common.submit') }}</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import handleSuccess from '../mixins/handle-success'
import userAddValidate from '../validations/user-add-validate'
const GroupSelect = () => import('./GroupSelect.vue')

export default {
  name: 'add-user-form',

  data() {
    return {
      errors: {},
      params: {
        name: '',
        email: '',
        role: 'member',
        group_id: ''
      }
    }
  },

  mixins: [handleSuccess, userAddValidate],

  computed: {
    ...mapState('initialStates', ['meta'])
  },

  components: {
    GroupSelect
  },

  methods: {
    ...mapActions('companyUsers', ['createUser']),

    create(params) {
      this.createUser(params)
        .then(response => {
          this.handleSuccess({ message: this.$t('messages.user.addSuccess'), emitType: 'afterAdded' })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
          else throw error
        })
    }
  }
}
</script>
