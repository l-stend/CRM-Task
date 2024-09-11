<script setup lang="ts">
import { useContactStore, useEditModalStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import PButton from 'primevue/button'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

// handle btns actions
const editModalStore = useEditModalStore()
const { selectedContact } = storeToRefs(editModalStore)
const contactStore = useContactStore()
// confirmation call dispatch
const handleConfirmation = () => {
  if (selectedContact.value.id) {
    contactStore.editContact()
  } else {
    contactStore.addContact()
  }
}
</script>

<template>
  <div id="modal-btns-wrapper" class="w-full flex flex-row justify-center gap-5 pt-7">
    <PButton
      :label="t('shared.cancel')"
      icon="pi pi-times"
      outlined
      @click="editModalStore.closeEditModal()"
    />
    <PButton
      :label="selectedContact.id ? t('shared.edit') : t('shared.add')"
      icon="pi pi-check"
      @click="handleConfirmation"
    />
  </div>
</template>
