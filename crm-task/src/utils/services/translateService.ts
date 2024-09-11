interface I18nInstance {
  global: {
    t: (key: string, locale?: string) => string
  }
}

let i18n: I18nInstance | null = null

// get i18n instance from the vue setup phase
export const setTranslateService = (instance: I18nInstance) => {
  i18n = instance
}

// expose t function to be used outside vue components
export const useGlobalTranslate = (key: string, locale?: string): string => {
  if (!i18n) {
    console.warn('i18n instance is not initialized')
  }
  return (i18n as I18nInstance).global.t(key, locale)
}
