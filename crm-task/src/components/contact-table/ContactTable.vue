<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useContactStore, useEditModalStore } from '../../stores'
// can't find the type from primevue
import { tableColumnsList } from '@/utils/misc/table-columns-list'
import TablePagination from './TablePagination.vue'
import type { ContactStatus } from '@/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// hadnle table content
const contactsStore = useContactStore()
const { contactList } = storeToRefs(contactsStore)

const getBadgeColor = (status: ContactStatus): string => {
  switch (status) {
    case 'customer':
      return 'help'

    case 'interested':
      return 'success'

    case 'contacted':
      return 'danger'

    case 'negotiation':
      return 'info'

    default:
      return 'contrast'
  }
}

// handle edit modal
const editModalStore = useEditModalStore()
</script>

<template>
  <TablePagination />

  <DataTable
    :value="contactList"
    tableStyle=""
    class="w-full p-5"
    size="small"
    :resizableColumns="true"
  >
    <Column
      v-for="col of tableColumnsList"
      :key="col.field"
      :field="col.field"
      :header="t('table.headers.' + col.header)"
      :sortable="col.sortable"
      :data-cy="'column-header-' + col.field"
    ></Column>

    <Column header="Status" field="status">
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.status"
          :severity="getBadgeColor(slotProps.data.status)"
          :data-cy="'status-badge-' + slotProps.data.id"
        />
      </template>
    </Column>

    <Column :header="t('table.headers.actions')" field="id">
      <template #body="slotProps">
        <div class="w-full flex flex-row">
          <Button
            @click="editModalStore.openEditModal(slotProps.data)"
            icon="pi pi-user-edit"
            outlined
            size="small"
            class="mx-1"
            :data-cy="'edit-contact-btn-' + slotProps.data.id"
          />
          <Button
            @click="contactsStore.deleteContact(slotProps.data.id)"
            icon="pi pi-trash"
            outlined
            size="small"
            class="mx-1"
            :data-cy="'delete-contact-btn-' + slotProps.data.id"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
