import type { TableColumn } from '@/types'

export const tableColumnsList: TableColumn[] = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
  { field: 'phone', header: 'Phone', sortable: false },
  { field: 'company', header: 'Company', sortable: true },
  { field: 'country', header: 'Country', sortable: true }
]
