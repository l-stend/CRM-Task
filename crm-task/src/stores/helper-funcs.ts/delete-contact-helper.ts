import { storeToRefs } from 'pinia'
import { useContactStore } from '../contactStore'
import { contactListFetch } from '@/axios/contact-list-fetch'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'

export const deleteContactHelper = async (contactId: number) => {
  const contactStore = useContactStore()
  const { isLoading, currentPage, contactList } = storeToRefs(contactStore)

  // set loading to true
  isLoading.value = true

  try {
    await contactListFetch.delete(`/${contactId}`)

    // check if is latest item on page
    const isLastOnPage = contactList.value.length === 1 && currentPage.value > 1

    if (isLastOnPage) {
      currentPage.value--
    }

    // refresh the contact list
    contactStore.getContacts()

    // render success toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'success',
      summary: useGlobalTranslate('shared.success'),
      detail: useGlobalTranslate('toasts.deleteContactSuccess'),
      life: 3000
    })
  } catch (error) {
    // render error toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'error',
      summary: useGlobalTranslate('shared.error'),
      detail: useGlobalTranslate('toasts.deleteContactError'),
      life: 3000
    })

    console.error('Error deleting contact:', error)
  } finally {
    isLoading.value = false
  }
}
