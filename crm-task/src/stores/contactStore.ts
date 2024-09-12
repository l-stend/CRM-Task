import { contactListFetch } from '@/axios/contact-list-fetch'
import type { ContactItem, ContactStatus } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useEditModalStore } from './editModalStore'
import { list } from 'postcss'

interface ContactStoreState {
  isLoading: boolean
  contactList: ContactItem[]
  pagesCount: number
  currentPage: number
  perPage: number
  activeFilters: ContactStatus[]
}

const initialState: ContactStoreState = {
  isLoading: false,
  contactList: [],
  pagesCount: 0,
  currentPage: 1,
  perPage: 15,
  activeFilters: ['customer', 'interested']
}

export const useContactStore = defineStore('contact', {
  state: () => initialState as ContactStoreState,
  actions: {
    toggleFilter(status: ContactStatus) {
      const index = this.activeFilters.indexOf(status)
      if (index === -1) {
        // add filter if not there
        this.activeFilters.push(status)
      } else {
        // remove if already toggled
        this.activeFilters.splice(index, 1)
      }

      // refresh contact list
      this.getContacts()
    },

    async getContacts() {
      // set loading to true
      this.isLoading = true

      // configure params
      const params: {
        _page: number
        _limit: number
        status?: string
      } = {
        _page: this.currentPage,
        _limit: this.perPage
      }

      // add status filter if activeFilters are present
      if (this.activeFilters.length > 0) {
        params.status = this.activeFilters.join('|')
      }

      try {
        const response = await contactListFetch.get<ContactItem[]>('', {
          params
        })

        // set the contact list and the total count pages
        this.contactList = response.data

        const totalItems = parseInt(response.headers['x-total-count'], 10)
        this.pagesCount = Math.ceil(totalItems / this.perPage)
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
        this.isLoading = false
      }
    },

    // i guess add and edit calls could have been in the modal store too
    async addContact() {
      // set loading to true
      this.isLoading = true

      const editModalStore = useEditModalStore()
      const newContact = { ...editModalStore.selectedContact }

      // validate all fields are filled
      const requiredFields: (keyof ContactItem)[] = [
        'name',
        'email',
        'phone',
        'company',
        'status',
        'country'
      ]
      const emptyFields = requiredFields.filter((field) => !newContact[field])

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
        return
      }

      try {
        await contactListFetch.post<ContactItem>('', newContact)

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
        this.currentPage = this.pagesCount
        this.getContacts()
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
        this.isLoading = false
      }
    },

    async editContact() {
      // set loading to true
      this.isLoading = true

      const editModalStore = useEditModalStore()
      const newContact = { ...editModalStore.selectedContact }

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
      const emptyFields = requiredFields.filter((field) => !newContact[field])

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
        return
      }

      try {
        await contactListFetch.put<ContactItem>(`/${newContact.id.toString()}`, newContact)

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
        this.getContacts()
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
        this.isLoading = false
      }
    },

    async deleteContact(contactId: number) {
      // set loading to true
      this.isLoading = true

      try {
        await contactListFetch.delete(`/${contactId}`)

        // check if is latest item on page
        const isLastOnPage = this.contactList.length === 1 && this.currentPage > 1

        if (isLastOnPage) {
          this.currentPage--
        }

        // refresh the contact list
        this.getContacts()

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
        this.isLoading = false
      }
    }
  }
})
