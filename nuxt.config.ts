// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  srcDir: 'src/',
  tailwindcss: {
    cssPath: '~/assets/main.css',
  },
  pages: true,
  imports: {
    dirs: ['store', 'utils']
  },
  // build: {
  //   transpile: ['gsap'],
  // },
})
