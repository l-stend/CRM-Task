import { storeToRefs } from 'pinia'
import { useContactStore } from '../contactStore'
import { useEditModalStore } from '../editModalStore'
import type { ContactItem } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'
import { contactListFetch } from '@/axios/contact-list-fetch'

export const editContactHelper = async () => {
  const contactStore = useContactStore()
  const { isLoading } = storeToRefs(contactStore)

  const editModalStore = useEditModalStore()
  const { selectedContact } = storeToRefs(editModalStore)

  // set loading to true
  isLoading.value = true

  // validate all fields are filled
  const requiredFields: (keyof ContactItem)[] = [
    'id',
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
    // log the empty fields for debugging & abort
    console.error('Empty fields:', emptyFields)
    isLoading.value = false
    return
  }

  try {
    await contactListFetch.put<ContactItem>(
      `/${selectedContact.value.id.toString()}`,
      selectedContact.value
    )

    // render success toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'success',
      summary: useGlobalTranslate('shared.success'),
      detail: useGlobalTranslate('toasts.editContactSuccess'),
      life: 3000
    })

    // close modal
    editModalStore.closeEditModal()

    // refresh list
    contactStore.getContacts()
  } catch (error) {
    // render error toast
    const toast = useGlobalToast()
    toast.add({
      severity: 'error',
      summary: useGlobalTranslate('shared.error'),
      detail: useGlobalTranslate('toasts.editContactError'),
      life: 3000
    })

    console.error('Error adding contact:', error)
  } finally {
    isLoading.value = false
  }
}
