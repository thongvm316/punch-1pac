<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.params.name.$error || errors.name }">
      <label class="form-label">{{ $t('label.name') }}</label>
      <input class="form-input" type="text" :placeholder="$t('label.name')" v-model="$v.params.name.$model">
      <p class="form-input-hint" v-if="$v.params.name.$error && !errors.name">
        {{ $t('validation.required', { name: $t('label.name') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.name">{{ $t('label.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.image }">
      <label class="form-label">{{ $t('label.image') }}</label>
      <img class="img-profile" :src="targetGroup.image_url" alt="" v-if="targetGroup">
      <input class="form-input" type="file" @change="setImageFile">
      <p class="form-input-hint" v-if="errors.image">{{ $t('label.image') }} {{ errors.image[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.description }">
      <label class="form-label">{{ $t('label.description') }}</label>
      <textarea class="form-input" :placeholder="$t('label.description')" v-model="params.description"></textarea>
      <p class="form-input-hint" v-if="errors.description">{{ $t('label.description') }} {{ errors.description[0] }}</p>
    </div>
    <div class="form-group">
      <button ref="localAddGroupButton" type="button" class="btn btn-success btn-submit" @click="localAddGroup" v-if="!targetGroup" :disabled="isDisabled">{{ $t('button.common.submit') }}</button>
      <button ref="localEditGroupButton" type="button" class="btn btn-success btn-submit" @click="localEditGroup" v-if="targetGroup" :disabled="isDisabled">{{ $t('button.common.save') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import handleSuccess from '../mixins/handle-success'
import groupFormValidate from '../validations/group-form-validate'

export default {
  name: 'group-form',

  mixins: [handleSuccess, groupFormValidate],

  props: {
    targetGroup: Object
  },

  data() {
    return {
      params: {
        name: '',
        description: '',
        image: ''
      },
      errors: {}
    }
  },

  methods: {
    ...mapActions('groups', ['addGroup']),

    ...mapActions('group', ['updateGroup']),

    localAddGroup() {
      this.addGroup(this.params)
        .then(response => {
          this.handleSuccess({
            emitType: 'afterModify',
            message: this.$t('messages.group.createSuccess')
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    localEditGroup() {
      this.updateGroup({ groupId: this.targetGroup.id, editParams: this.params })
        .then(response => {
          this.handleSuccess({
            emitType: 'afterModify',
            message: this.$t('messages.group.updateSuccess')
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    setImageFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.image = files[0]
    }
  },

  created() {
    if (this.targetGroup) this.params = { ...this.targetGroup }
  }
}
</script>
