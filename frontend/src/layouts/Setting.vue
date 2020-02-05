<template>
  <main>
    <div class="container grid-xl mt-10">
      <div class="columns">
        <div class="column col-3">
          <slot name="sidebar" />
        </div>

        <div class="column col-9">
          <div class="box-setting">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SettingLayout'
}
</script>
