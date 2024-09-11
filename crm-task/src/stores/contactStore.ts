import type { ContactItem, ContactStatus } from '@/types'
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
  actions: {}
})
