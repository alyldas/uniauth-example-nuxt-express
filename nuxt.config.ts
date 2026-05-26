export default defineNuxtConfig({
  compatibilityDate: '2026-05-25',
  css: ['~/assets/css/base.css'],
  devtools: { enabled: false },
  modules: ['@alyldas/uniauth-nuxt'],
  uniauth: {
    apiBase: process.env.NUXT_AUTH_BACKEND_ORIGIN ?? 'http://127.0.0.1:4000',
    redirects: {
      signIn: '/sign-in',
    },
    sessionCookieNames: ['uniauth_example_session'],
  },
})
