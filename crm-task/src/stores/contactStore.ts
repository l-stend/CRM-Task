import { contactListFetch } from '@/axios/contact-list-fetch'
import type { ContactItem, ContactStatus } from '@/types'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'
import axios from 'axios'
import { defineStore } from 'pinia'

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
    }
  }
})
