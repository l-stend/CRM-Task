import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useContactStore } from '../index'
import { contactListFetch } from '@/axios/contact-list-fetch'
import { useGlobalToast, useGlobalTranslate } from '@/utils/services'

// mock dependencies to avoid making real API calls
vi.mock('@/axios/contact-list-fetch')
vi.mock('@/utils/services')

describe('contactStore', () => {
  // create a mock object for toast notifications
  const mockToast = {
    add: vi.fn(),
    removeGroup: vi.fn(),
    removeAllGroups: vi.fn()
  }

  beforeEach(() => {
    //  initialize the pinia store and reset mocks
    setActivePinia(createPinia())
    vi.resetAllMocks()

    // configure useGlobalToast to return the mock toast object
    vi.mocked(useGlobalToast).mockReturnValue(mockToast)
  })

  describe('toggleFilter', () => {
    it('should add a filter if not present', () => {
      const store = useContactStore()
      const initialFilters = [...store.activeFilters]

      // toggle the 'contacted' filter
      store.toggleFilter('contacted')

      // check if the filter was added
      expect(store.activeFilters).toEqual([...initialFilters, 'contacted'])
    })

    it('should remove a filter if already present', () => {
      const store = useContactStore()

      // toggle (remove) the 'contacted' filter
      store.toggleFilter('customer')

      // check if the filter was removed
      expect(store.activeFilters).not.toContain('customer')
    })

    it('should call getContacts after toggling', () => {
      const store = useContactStore()

      //  spy on the getContacts method
      const getContactsSpy = vi.spyOn(store, 'getContacts')

      // toggle the 'contacted' filter
      store.toggleFilter('contacted')

      // verify that getContacts was called
      expect(getContactsSpy).toHaveBeenCalledOnce()
    })
  })

  describe('getContacts', () => {
    it('should fetch contacts and update store', async () => {
      const store = useContactStore()

      //  mock a successful API response
      const mockResponse = {
        data: [{ id: 1, name: 'Test Contact' }],
        headers: { 'x-total-count': '1' }
      }
      vi.mocked(contactListFetch.get).mockResolvedValue(mockResponse)

      // call getContacts
      await store.getContacts()

      // check if the store was updated correctly
      expect(store.contactList).toEqual(mockResponse.data)
      expect(store.pagesCount).toBe(1)
      expect(store.isLoading).toBe(false)
    })

    it('should handle errors', async () => {
      const store = useContactStore()

      //  mock an API error
      vi.mocked(contactListFetch.get).mockRejectedValue(new Error('API Error'))

      // call getContacts
      await store.getContacts()

      // check if the error was handled by rendering the correct toast
      expect(mockToast.add).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'error',
          detail: useGlobalTranslate('toasts.getContactListError')
        })
      )
      expect(store.isLoading).toBe(false)
    })
  })

  describe('addContact', () => {
    it('should handle errors during contact creation', async () => {
      const store = useContactStore()
      //mock an error during contact creation

      vi.mocked(contactListFetch.post).mockRejectedValue(new Error('Add contact error'))

      // call addContact
      await store.addContact()

      // check if the error was handled by rendering the correct toast
      expect(mockToast.add).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'error',
          detail: useGlobalTranslate('toasts.addContactError')
        })
      )
    })
  })

  describe('editContact', () => {
    it('should handle errors during contact editing', async () => {
      const store = useContactStore()
      // mock an error during contact editing
      vi.mocked(contactListFetch.put).mockRejectedValue(new Error('Edit contact error'))

      // call editContact
      await store.editContact()

      // check if the error was handled by rendering the correct toast
      expect(mockToast.add).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'error',
          detail: useGlobalTranslate('toasts.editContactError')
        })
      )
    })
  })

  describe('deleteContact', () => {
    it('should handle errors during deletion', async () => {
      const store = useContactStore()

      // mock an error during contact deletion
      vi.mocked(contactListFetch.delete).mockRejectedValue(new Error('Delete contact error'))

      // call deleteContact
      await store.deleteContact(1)

      // check if the error was handled by rendering the correct toast
      expect(mockToast.add).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'error',
          detail: useGlobalTranslate('toasts.deleteContactListError')
        })
      )
    })
  })
})
