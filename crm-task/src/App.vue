<script setup lang="ts">
import { useContactStore } from './stores'
import PToast from 'primevue/toast'
import MainLayout from './layouts/MainLayout.vue'

// get the contacts at app's first rendering
const contactStore = useContactStore()
contactStore.getContacts()
</script>

<template>
  <MainLayout />
  <PToast />
</template>
