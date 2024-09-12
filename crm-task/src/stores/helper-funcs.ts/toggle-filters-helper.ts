import type { ContactStatus } from '@/types'
import { storeToRefs } from 'pinia'
import { useContactStore } from '../contactStore'

export const toggleFilterHelper = (status: ContactStatus) => {
  const contactStore = useContactStore()
  const { activeFilters } = storeToRefs(contactStore)

  const index = activeFilters.value.indexOf(status)
  if (index === -1) {
    // add filter if not there
    activeFilters.value.push(status)
  } else {
    // remove if already toggled
    activeFilters.value.splice(index, 1)
  }

  // refresh contact list
  contactStore.getContacts()
}
