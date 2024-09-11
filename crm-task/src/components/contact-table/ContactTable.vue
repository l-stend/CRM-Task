<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useContactStore } from '../../stores'
// can't find the type from primevue
import { tableColumnsList } from '@/utils/misc/table-columns-list'
import TablePagination from './TablePagination.vue'
import type { ContactStatus } from '@/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    ></Column>

    <Column header="Status" field="status">
      <template #body="slotProps">
        <Tag :value="slotProps.data.status" :severity="getBadgeColor(slotProps.data.status)" />
      </template>
    </Column>

    <Column :header="t('table.headers.actions')" field="id">
      <template #body="slotProps">
        <div class="w-full flex flex-row">
          <Button
            @click="() => console.log(slotProps)"
            icon="pi pi-user-edit"
            outlined
            size="small"
            class="mx-1"
          />
          <Button
            @click="() => console.log(slotProps)"
            icon="pi pi-trash"
            outlined
            size="small"
            class="mx-1"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
