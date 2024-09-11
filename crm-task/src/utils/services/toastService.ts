import type { ToastServiceMethods } from 'primevue/toastservice'

let toastService: ToastServiceMethods | null = null

// get the ToastService instance from the vue setup phase
export const setToastService = (service: ToastServiceMethods) => {
  toastService = service
}

// expose primevue toast service to be used from outside vue components
export const useGlobalToast = () => {
  if (!toastService) {
    console.warn('Toast service not initialized')
    return {
      add: () => {},
      removeGroup: () => {},
      removeAllGroups: () => {}
    }
  }
  return toastService
}
