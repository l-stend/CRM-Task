<script setup lang="ts">
import { useContactStore, useEditModalStore } from '@/stores'
import type { ContactStatus } from '@/types'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PDivider from 'primevue/divider'
import PButton from 'primevue/button'
import { blankContact } from '@/utils/misc/blankContact'

// handle filters
const contactsStore = useContactStore()
const { activeFilters } = storeToRefs(contactsStore)

// handle lang switch
const { t, locale } = useI18n()
const handleLangToggle = () => {
  locale.value = locale.value == 'en-US' ? 'it-IT' : 'en-US'
}

// handle filter toggle btns
const statusOptions: ContactStatus[] = ['customer', 'contacted', 'interested', 'negotiation']
const handleFilterToggling = (status: ContactStatus) => {
  contactsStore.toggleFilter(status)
}

// handle create new contact
const editModalStore = useEditModalStore()
</script>

<template>
  <div
    id="table-console-wrapper"
    class="w-full flex flex-col justify-start items-start pt-10 px-3 gap-5"
  >
    <p class="font-bold text-lg">{{ t('console.filterHeader') }}</p>

    <PDivider />

    <div id="filter-btns-wrapper" class="w-full flex flex-col justify-start items-start gap-2">
      <PButton
        v-for="(opt, index) in statusOptions"
        :key="index"
        :label="t('shared.' + opt)"
        @click="handleFilterToggling(opt)"
        :outlined="!activeFilters.includes(opt)"
        class="w-full"
        :icon="activeFilters.includes(opt) ? 'pi pi-filter' : 'pi pi-filter-slash'"
      />
    </div>

    <PDivider />

    <PButton
      :label="t('console.addContact')"
      icon="pi pi-plus"
      @click="editModalStore.openEditModal(blankContact)"
    />
    <PButton
      :label="t('console.langSwitch')"
      icon="pi pi-language"
      text
      @click="handleLangToggle"
    />
  </div>
</template>
