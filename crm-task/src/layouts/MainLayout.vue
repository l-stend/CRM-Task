<script setup lang="ts">
import { ContactTable, TableConsole, EditModal } from '@/components'
import { useContactStore } from '@/stores'
import { storeToRefs } from 'pinia'
import PProgressSpinner from 'primevue/progressspinner'

const contactsStore = useContactStore()
const { isLoading } = storeToRefs(contactsStore)
</script>

<template>
  <main class="min-h-screen grid grid-cols-12 light-theme py-2 px-2">
    <section class="col-span-2 min-h-screen bg-gray-100 rounded-lg">
      <TableConsole />
    </section>

    <section class="col-span-10 min-h-screen flex flex-col justify-center items-center p-5">
      <PProgressSpinner v-if="isLoading" />
      <ContactTable v-else />
    </section>
  </main>

  <EditModal />
</template>

<style scoped>
.light-theme {
  background: linear-gradient(180deg, #f7f7f7, #ffffff);
}
</style>
