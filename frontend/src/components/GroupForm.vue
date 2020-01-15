<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.params.name.$error || errors.name }">
      <label class="form-label">{{ $t('group.labels.name') }}</label>
      <input class="form-input" type="text" :placeholder="$t('group.labels.name')" v-model="$v.params.name.$model">
      <p class="form-input-hint" v-if="$v.params.name.$error && !errors.name">
        {{ $t('validation.required', { name: $t('group.labels.name') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.name">{{ $t('group.labels.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.image }">
      <label class="form-label">{{ $t('group.labels.image') }}</label>
      <img class="img-profile" :src="targetGroup.image_url" alt="" v-if="targetGroup">
      <input class="form-input" type="file" @change="setImageFile">
      <p class="form-input-hint" v-if="errors.image">{{ $t('group.labels.image') }} {{ errors.image[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.description }">
      <label class="form-label">{{ $t('group.labels.description') }}</label>
      <textarea class="form-input" :placeholder="$t('group.labels.description')" v-model="params.description"></textarea>
      <p class="form-input-hint" v-if="errors.description">{{ $t('group.labels.description') }} {{ errors.description[0] }}</p>
    </div>
    <div class="form-group">
      <button ref="localAddGroupButton" type="button" class="btn btn-success btn-submit" @click="localAddGroup" v-if="!targetGroup" :disabled="isDisabled">{{ $t('groups.btn.submit') }}</button>
      <button ref="localEditGroupButton" type="button" class="btn btn-success btn-submit" @click="localEditGroup" v-if="targetGroup" :disabled="isDisabled">{{ $t('group.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isEqual } from 'underscore'
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
      errors: {},
      data: {
        emitType: 'afterModify',
        message: ''
      }
    }
  },

  computed: {
    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.targetGroup) {
        flag = isEqual(this.params, this.targetGroup)
      } else {
        flag = this.params.name === ''
      }

      return flag
    }
  },

  methods: {
    ...mapActions('groups', ['addGroup']),

    ...mapActions('group', ['updateGroup']),

    localAddGroup() {
      this.addGroup(this.params)
        .then(response => {
          this.data.message = this.$t('messages.group.createSuccess')
          this.handleSuccess(this.data)
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    localEditGroup() {
      this.updateGroup({ groupId: this.targetGroup.id, editParams: this.params })
        .then(response => {
          this.data.message = this.$t('messages.group.updateSuccess')
          this.handleSuccess(this.data)
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
