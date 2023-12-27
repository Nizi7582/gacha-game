import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(async () => {
    if(process.client) {
        gsap.registerPlugin()
    }
    return {
        provide: {
          gsap,
        },
      }
})