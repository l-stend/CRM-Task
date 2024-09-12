import { storeToRefs } from 'pinia'
import { useContactStore } from '../contactStore'
import { contactListFetch } from '@/axios/contact-list-fetch'
import type { ContactItem } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'

export const getContactsHelper = async () => {
  const contactStore = useContactStore()
  const { isLoading, currentPage, pagesCount, activeFilters, perPage, contactList } =
    storeToRefs(contactStore)

  // set loading to true
  isLoading.value = true

  // configure params
  const params: {
    _page: number
    _limit: number
    status?: string
  } = {
    _page: currentPage.value,
    _limit: perPage.value
  }

  // add status filter if activeFilters are present
  if (activeFilters.value.length > 0) {
    params.status = activeFilters.value.join('|')
  }

  try {
    const response = await contactListFetch.get<ContactItem[]>('', {
      params
    })

    // set the contact list and the total count pages
    contactList.value = response.data

    const totalItems = parseInt(response.headers['x-total-count'], 10)
    pagesCount.value = Math.ceil(totalItems / perPage.value)
  } catch (error) {
    // render error toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'error',
      summary: useGlobalTranslate('shared.error'),
      detail: useGlobalTranslate('toasts.getContactListError'),
      life: 3000
    })

    console.error('Error fetching contacts:', error)
  } finally {
    isLoading.value = false
  }
}
