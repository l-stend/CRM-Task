import { storeToRefs } from 'pinia'
import { useContactStore } from '../contactStore'
import { useEditModalStore } from '../editModalStore'
import type { ContactItem } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'
import { contactListFetch } from '@/axios/contact-list-fetch'

export const addContactHelper = async () => {
  const contactStore = useContactStore()
  const { isLoading, currentPage, pagesCount } = storeToRefs(contactStore)

  const editModalStore = useEditModalStore()
  const { selectedContact } = storeToRefs(editModalStore)
  // set loading to true
  isLoading.value = true

  // validate all fields are filled
  const requiredFields: (keyof ContactItem)[] = [
    'name',
    'email',
    'phone',
    'company',
    'status',
    'country'
  ]
  const emptyFields = requiredFields.filter((field) => !selectedContact.value[field])

  if (emptyFields.length > 0) {
    // some fields are empty, show error toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'error',
      summary: useGlobalTranslate('shared.error'),
      detail: useGlobalTranslate('toasts.fillAllFieldsError'),
      life: 3000
    })
    // log the empty fields for debugging and abort
    console.error('Empty fields:', emptyFields)
    isLoading.value = false
    return
  }

  try {
    await contactListFetch.post<ContactItem>('', selectedContact.value)

    // render success toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'success',
      summary: useGlobalTranslate('shared.success'),
      detail: useGlobalTranslate('toasts.addContactSuccess'),
      life: 3000
    })

    // close modal
    editModalStore.closeEditModal()

    // go to last page and refresh list
    currentPage.value = pagesCount.value
    contactStore.getContacts()
  } catch (error) {
    // render error toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'error',
      summary: useGlobalTranslate('shared.error'),
      detail: useGlobalTranslate('toasts.addContactError'),
      life: 3000
    })

    console.error('Error adding contact:', error)
  } finally {
    isLoading.value = false
  }
}
