<script setup lang="ts">
import { useContactStore, useEditModalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PDialog from 'primevue/dialog'
import EditModalForm from './EditModalForm.vue'
import EditModalBtns from './EditModalBtns.vue'
import PProgressSpinner from 'primevue/progressspinner'

// handle dialog header
const editModal = useEditModalStore()
const { isModalOpen, selectedContact } = storeToRefs(editModal)

// handle loading state
const contactStore = useContactStore()
const { isLoading } = storeToRefs(contactStore)

const { t } = useI18n()
</script>

<template>
  <PDialog
    v-model:visible="isModalOpen"
    modal
    :header="selectedContact.id ? selectedContact.name : t('modal.modalHeader')"
    :style="{ width: '40vw' }"
    :closable="false"
    class="px-2"
  >
    <div
      v-if="isLoading"
      id="modal-spinner-wrapper"
      class="w-full flex flex-row justify-center py-5"
    >
      <PProgressSpinner />
    </div>
    <EditModalForm v-else />

    <EditModalBtns />
  </PDialog>
</template>
