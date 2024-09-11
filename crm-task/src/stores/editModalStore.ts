import type { ContactItem } from '@/types'
import { blankContact } from '@/utils/misc/blankContact'
import { defineStore } from 'pinia'

interface EditModalStoreState {
  selectedContact: ContactItem
  isModalOpen: boolean
}

const initialState: EditModalStoreState = {
  selectedContact: blankContact,
  isModalOpen: false
}

export const useEditModalStore = defineStore('edit-modal', {
  state: () => initialState as EditModalStoreState,
  actions: {}
})
