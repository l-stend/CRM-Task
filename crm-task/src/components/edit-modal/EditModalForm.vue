<script setup lang="ts">
import { useEditModalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PInputText from 'primevue/inputtext'
import PSelect, { type SelectProps } from 'primevue/select'
import type { ContactStatus } from '@/types'

// handle from entries
const editModal = useEditModalStore()
const { selectedContact } = storeToRefs(editModal)

const { t } = useI18n()

// handle status
const statusOptions: { label: string; value: ContactStatus }[] = [
  { label: t('shared.customer'), value: 'customer' },
  { label: t('shared.interested'), value: 'interested' },
  { label: t('shared.contacted'), value: 'contacted' },
  { label: t('shared.negotiation'), value: 'negotiation' }
]
</script>

<template>
  <div id="edit-form-wrapper" class="w-full flex flex-col justify-start items-center gap-3">
    <!-- name -->
    <div class="w-full flex flex-col gap-2">
      <label for="name">{{ t('modal.form.name') }}</label>
      <PInputText id="name" v-model="selectedContact.name" />
    </div>
    <!-- email-->
    <div class="w-full flex flex-col gap-2">
      <label for="email">{{ t('modal.form.email') }}</label>
      <PInputText id="email" v-model="selectedContact.email" />
    </div>
    <!-- phone -->
    <div class="w-full flex flex-col gap-2">
      <label for="phone">{{ t('modal.form.phone') }}</label>
      <PInputText id="phone" v-model="selectedContact.phone" />
    </div>
    <!-- company -->
    <div class="w-full flex flex-col gap-2">
      <label for="company">{{ t('modal.form.company') }}</label>
      <PInputText id="company" v-model="selectedContact.company" />
    </div>
    <!-- country -->
    <div class="w-full flex flex-col gap-2">
      <label for="country">{{ t('modal.form.country') }}</label>
      <PInputText id="country" v-model="selectedContact.country" />
    </div>
    <!-- status -->
    <div class="w-full flex flex-col gap-2">
      <label for="status">{{ t('modal.form.status') }}</label>
      <PSelect
        v-model="selectedContact.status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
  </div>
</template>
