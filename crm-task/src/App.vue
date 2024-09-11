<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <Button :label="t('bla')" />

  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
