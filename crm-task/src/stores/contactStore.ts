import { contactListFetch } from '@/axios/contact-list-fetch'
import type { ContactItem, ContactStatus } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'
import axios from 'axios'
import { defineStore } from 'pinia'

interface ContactStoreState {
  isLoading: boolean
  contactList: ContactItem[]
  totalCountUsers: number
  currentPage: number
  perPage: number
  activeFilters: ContactStatus[]
}

const initialState: ContactStoreState = {
  isLoading: false,
  contactList: [],
  totalCountUsers: 0,
  currentPage: 1,
  perPage: 20,
  activeFilters: ['customer', 'interested', 'negotiation', 'contacted']
}

export const useContactStore = defineStore('contact', {
  state: () => initialState as ContactStoreState,
  actions: {
    async getContacts() {
      // set loading to true
      this.isLoading = true

      const params: {
        _page: number
        _limit: number
      } = {
        _page: this.currentPage,
        _limit: this.perPage
      }

      try {
        const response = await contactListFetch.get<ContactItem[]>('45345', {
          params
        })

        // set the contact list and the total count of contacts from headers
        this.contactList = response.data
        this.totalCountUsers = parseInt(response.headers['x-total-count'], 10)
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
    }
  }
})
