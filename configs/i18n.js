export default {
  vueI18n      : { enableInSFC: true },
  vueI18nLoader: true,
  locales      : [
    // { code: 'ar', file: 'ar.js' },
    { code: 'en', file: 'en.js' },
    // { code: 'es', file: 'es.js' },
    // { code: 'fr', file: 'fr.js' },
    // { code: 'ru', file: 'ru.js' },
    // { code: 'zn', file: 'zn.js' }
  ],
  defaultLocale        : 'en',
  strategy             : 'prefix_except_default',
  lazy                 : false,
  langDir              : 'locales/',
  // vueI18n      : { fallbackLocale: 'en' },
  detectBrowserLanguage: {
    // If enabled, a cookie is set once a user has been redirected to his
    // preferred language to prevent subsequent redirections
    // Set to false to redirect every time
    useCookie     : true,
    // Cookie name
    cookieKey     : 'i18n_redirected',
    // Set to always redirect to value stored in the cookie, not just once
    alwaysRedirect: true,
    // If no locale for the browsers locale is a match, use this one as a fallback
    fallbackLocale: 'en'
  },
  vuex: {
    // Module namespace
    moduleName: 'i18n',

    // If enabled, current app's locale is synced with nuxt-i18n store module
    syncLocale: true,

    // If enabled, current translation messages are synced with nuxt-i18n store module
    syncMessages: false,

    // Mutation to commit to set route parameters translations
    syncRouteParams: true
  }
}
