import type { TableColumn } from '@/types'

export const tableColumnsList: TableColumn[] = [
  { field: 'name', header: 'name', sortable: true },
  { field: 'email', header: 'email', sortable: true },
  { field: 'phone', header: 'phone', sortable: false },
  { field: 'company', header: 'company', sortable: true },
  { field: 'country', header: 'country', sortable: true }
]
