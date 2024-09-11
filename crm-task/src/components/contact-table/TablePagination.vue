<script setup lang="ts">
// primevue pagination was different than i thought so i implemented my own one

import { storeToRefs } from 'pinia'
import { useContactStore } from '../../stores'
import { watch } from 'vue'
import PButton from 'primevue/button'
import PSelect from 'primevue/select'

const contactsStore = useContactStore()
const { perPage, pagesCount, currentPage } = storeToRefs(contactsStore)

// update list when page and per page changes
watch([currentPage, perPage], () => contactsStore.getContacts())
</script>

<template>
  <div id="paginator-wrapper" class="w-full flex flex-row justify-center items-center gap-3">
    <div id="pages-wrapper" class="flex flex-row items-center gap-2">
      <PButton
        v-for="n in pagesCount"
        :key="n"
        :label="n"
        @click="() => (currentPage = n)"
        :outlined="currentPage != n"
      />
    </div>
    <PSelect v-model="perPage" :options="[10, 15, 20]" />
  </div>
</template>
