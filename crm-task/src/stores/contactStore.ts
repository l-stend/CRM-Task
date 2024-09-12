import { contactListFetch } from '@/axios/contact-list-fetch'
import type { ContactItem, ContactStatus } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'
import { defineStore } from 'pinia'
import { useEditModalStore } from './editModalStore'
import {
  addContactHelper,
  deleteContactHelper,
  editContactHelper,
  getContactsHelper,
  toggleFilterHelper
} from './helper-funcs.ts'

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
  activeFilters: ['customer', 'negotiation']
}

export const useContactStore = defineStore('contact', {
  state: () => initialState as ContactStoreState,
  actions: {
    toggleFilter(status: ContactStatus) {
      toggleFilterHelper(status)
    },

    async getContacts() {
      getContactsHelper()
    },

    // i guess add and edit calls could have been in the modal store too
    async addContact() {
      addContactHelper()
    },

    async editContact() {
      editContactHelper()
    },

    async deleteContact(contactId: number) {
      deleteContactHelper(contactId)
    }
  }
})
