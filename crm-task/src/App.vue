<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useContactStore } from './stores'
import PToast from 'primevue/toast'

const { t } = useI18n()

const contactStore = useContactStore()
contactStore.getContacts()
</script>

<template>
  <Button :label="t('bla')" />

  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <PToast />
</template>
