<script setup lang="ts">
import { useEditModalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PDialog from 'primevue/dialog'
import EditModalForm from './EditModalForm.vue'
import EditModalBtns from './EditModalBtns.vue'

const editModal = useEditModalStore()
const { isModalOpen, selectedContact } = storeToRefs(editModal)

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
    <EditModalForm />
    <EditModalBtns />
  </PDialog>
</template>
